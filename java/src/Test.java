import static spark.Spark.*;

public class Test {
    public static void main(String[] args) {
    	port(50000);
        get("/hello", (req, res) -> "Hello World");
    }
}