import ballerina/log;
import ballerinax/mysql;

// Shared DB client for the app
isolated mysql:Client db = checkpanic new (user = "root",
    password = "",
    host = "localhost",
    port = 3306,
    database = "household_db");

// Database connection will be logged in the class constructor or after client creation if needed.

public class DBUtil {
    mysql:Client dbClient;

    // Constructor
    isolated function init() {
        self.dbClient = checkpanic new mysql:Client(
            "localhost",
            "3306",
            "household_db",
            "root",
            " ",
            // No additional options needed here
        );
        log:printInfo("✅ Database connected successfully!");
    }
}
