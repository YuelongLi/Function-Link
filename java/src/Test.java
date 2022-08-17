import static spark.Spark.*;

import org.eclipse.jetty.util.ajax.JSON;

import spark.Service;

public class Test {
    public static void main(String[] args) {
    	Service http = Service.ignite().port(50000);
//    	options("/*",
//    	        (request, response) -> {
//
//    	            String accessControlRequestHeaders = request
//    	                    .headers("Access-Control-Request-Headers");
//    	            if (accessControlRequestHeaders != null) {
//    	                response.header("Access-Control-Allow-Headers",
//    	                        accessControlRequestHeaders);
//    	            }
//
//    	            String accessControlRequestMethod = request
//    	                    .headers("Access-Control-Request-Method");
//    	            if (accessControlRequestMethod != null) {
//    	                response.header("Access-Control-Allow-Methods",
//    	                        accessControlRequestMethod);
//    	            }
//
//    	            return "OK";
//    	        });

    	http.before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));
        http.get("/hello", (req, res) -> "Hello World");
        http.post("/hey", (req, res) -> {
        	String[] answers = new String[10000];
        	for(int i = 0; i<10000; i++) {
        		answers[i] = "Hello World";
        	}
        	res.type("json");
        	return JSON.toString(answers);
        });
    }
}