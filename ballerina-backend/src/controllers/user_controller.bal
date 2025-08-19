import ballerina/http;
import ballerina/log;
import ballerina/io;
import ballerina/config;

type User record {
    int id;
    string name;
    string email;
    string password;
};

service /users on new http:Listener(8080) {

    resource function post createUser(http:Caller caller, http:Request req) returns error? {
        User newUser = check req.getJsonPayload();
        // Logic to save the user to the database
        log:printInfo("User created: " + newUser.name);
        check caller->respond("User created successfully");
    }

    resource function get getUser(http:Caller caller, int id) returns error? {
        // Logic to retrieve the user from the database
        User user = check getUserFromDB(id);
        check caller->respond(user);
    }

    resource function delete deleteUser(http:Caller caller, int id) returns error? {
        // Logic to delete the user from the database
        log:printInfo("User deleted with id: " + id);
        check caller->respond("User deleted successfully");
    }

    // Function to simulate fetching user from the database
    function getUserFromDB(int id) returns User|error {
        // Placeholder for database retrieval logic
        return {id: id, name: "John Doe", email: "john.doe@example.com", password: "password123"};
    }
}