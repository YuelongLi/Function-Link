import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import static spark.Spark.*;
import org.eclipse.jetty.util.ajax.JSON;
import org.json.JSONArray;
import org.json.JSONObject;

import spark.Service;


/**
 * The function portal
 * @author Yuelong Li
 *
 */
public class Portal{
	
	/**
	 * Exports a function to the given port
	 * @param port
	 * @param dimension the dimension of the function output
	 * @param function
	 * @return
	 */
	public static <T,R> Link<T,R> export(int port, int dimension, Function<T, R> function) {
		return new Link<T,R>(port, dimension, function);
	}
	/**
	 * Exports a function to the given port
	 * @param port
	 * @param dimension the dimension of the function output
	 * @param function
	 * @return
	 */
	public static <T,R> Link<T,R> export(int port, Function<T, R> function) {
		return new Link<T,R>(port, 1, function);
	}
	
	public static void main(String[] args) {
		export(8080, 2,(Double[] xy)->new double[] {xy[1],xy[0]});
	}
}

interface Function<T,R>{
	R apply(T arg);
}

class Link<T,R>{
	String name;
	Function<T,R> export;
	Service http;
	int outputDimension;
	public Link(int port, int outputDimension, Function<T, R> function) {
		this.export = function;
		http = Service.ignite().port(port);
		initializeServices();
		this.outputDimension = outputDimension;
	}
	void initializeServices() {
		http.before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));
		http.post("/singular", (req, res) -> {
			try {

				System.out.println(req.body());
				JSONObject request = new JSONObject(req.body());
	        	res.type("json");
	        	JSONArray at = request.getJSONArray("at");
	        	int requestSize = at.length();
	        	int dimension = request.getInt("dimension");
	        	JSONObject response = new JSONObject();
	        	ArrayList<R> values = new ArrayList<R>();
	        	response.put("at", at);
	        	for(int i = 0; i<requestSize; i++) {
	        		if(dimension == 1) {
		        		Object input = at.getDouble(i);
		        		values.add(this.export.apply((T)input));
	        		}else {
	        			Object ar = at.get(i);
	        			if(!(ar instanceof JSONArray)) {
	        				res.status(416);
	        				response.put("error", "dimension mismatch");
	        			}else {
	        				JSONArray arr = (JSONArray) ar;
		        			Double[] input = new Double[arr.length()];
		        			for(int j = 0; j< arr.length(); j++) {
		        				input[j] = arr.getDouble(j);
		        			}
		        			values.add(this.export.apply((T)input));
	        			}
	        		}
	        	} 
	        	response.put("value", values);
	        	response.put("inputDimension", dimension);
	        	response.put("outputDimension", this.outputDimension);
	        	return response.toString();
			}catch(Exception e) {
				e.printStackTrace();
			}
			return null;
        });
	}
}
