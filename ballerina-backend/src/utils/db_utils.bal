import ballerina/io;
import ballerina/sql;
import ballerinax/mysql;

// Database configuration
const string dbHost = "localhost";
const int dbPort = 3306;
const string dbUser = "root";
const string dbPassword = "password";
const string dbName = "mydb";

// Function to create and return a new MySQL client
public function connect() returns mysql:Client|error {
    return check new mysql:Client(
        host = dbHost,
        port = dbPort,
        user = dbUser,
        password = dbPassword,
        database = dbName
    );
}

// Function to execute a query
public function executeQuery(string query) returns mysql:Result|error {
    mysql:Client client = check connect();
    mysql:Result result = check client->query(query);
    check client.close();
    return result;
}

// Function to close the database connection (if needed elsewhere)
public function closeConnection(mysql:Client client) returns error? {
    return client.close();
}