import ballerina/io;

configurable string dbHost = ?;
configurable int dbPort = ?;
configurable string dbUser = ?;
configurable string dbPassword = ?;
configurable string dbName = ?;

public function main() {
    io:println("DB Host: " + dbHost);
    io:println("DB Port: " + dbPort.toString());
    io:println("DB User: " + dbUser);
}
