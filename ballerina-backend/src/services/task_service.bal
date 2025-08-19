import ballerina/http;

import ballerina/log;

type Task record {
    int id?;
    string title;
    string description;
    string status?;
    float budget;
    string date;
};

service /tasks on new http:Listener(8080) {

    // Handle CORS preflight
    resource function options [string... path](http:Caller caller, http:Request req) returns error? {
        http:Response res = new;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.statusCode = 200;
        return caller->respond(res);
    }

    // Create a new task
    resource function post createTask(http:Caller caller, http:Request req) returns error? {
        json payload = check req.getJsonPayload();
        Task newTask = check payload.cloneWithType(Task);

        // Set defaults if needed
        if newTask.status is () {
            newTask.status = "Pending";
        }
        if newTask.id is () {
            newTask.id = 1; // Or generate a unique ID
        }

        log:printInfo("Task created: " + newTask.title);

        http:Response res = new;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setPayload("Task created successfully");
        res.statusCode = 201;
        return caller->respond(res);
    }

    // Get a task by ID
    resource function get getTask(http:Caller caller, int id) returns error? {
        // Logic to retrieve the task from the database
        Task task = {
            id: id,
            title: "Sample Task",
            description: "This is a sample task",
            status: "Pending",
            budget: 0.0,
            date: "2023-01-01"
        };

        http:Response res = new;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setPayload(task);
        res.statusCode = 200;
        return caller->respond(res);
    }

    // Delete a task by ID
    resource function delete deleteTask(http:Caller caller, int id) returns error? {
        // Logic to delete the task from the database
        log:printInfo("Task deleted with ID: " + id.toString());

        http:Response res = new;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setPayload("Task deleted successfully");
        res.statusCode = 200;
        return caller->respond(res);
    }
}
