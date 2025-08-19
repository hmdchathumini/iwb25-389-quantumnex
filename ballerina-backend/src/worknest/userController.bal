import ballerina/http;

service /user on new http:Listener(8080) {

    resource function post create(http:Caller caller, http:Request req) returns error? {
        // Implement user creation logic here
        check caller->respond("User created");
    }

    resource function get [string id](http:Caller caller) returns error? {
        // Implement get user logic here
        check caller->respond("User details for " + id);
    }

    resource function delete [string id](http:Caller caller) returns error? {
        // Implement delete user logic here
        check caller->respond("User deleted: " + id);
    }
}
