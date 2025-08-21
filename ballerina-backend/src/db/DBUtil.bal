import ballerina/log;
import ballerinax/mysql;

public class DBUtil {
    mysql:Client dbClient;

    // Constructor
    isolated function init() {
        self.dbClient = checkpanic new mysql:Client(
            "localhost",
            "3306",
            "household_db",
            "root",
            "",
            // No additional options needed here
        );
        log:printInfo("✅ Database connected successfully!");
    }
}
