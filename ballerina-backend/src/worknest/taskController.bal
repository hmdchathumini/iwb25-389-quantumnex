import ballerina/http;

service /tasks on new http:Listener(8080) {

    resource function post .(http:Caller caller, http:Request req) returns error? {
        // Implement createTask logic here
        check caller->respond("Task created");
    }

    resource function get [string id](http:Caller caller, http:Request req, string id) returns error? {
        // Implement getTask logic here
        check caller->respond("Task details for id: " + id);
    }

    resource function delete [string id](http:Caller caller, http:Request req, string id) returns error? {
        // Implement deleteTask logic here
        check caller->respond("Task deleted for id: " + id);
    }
}
