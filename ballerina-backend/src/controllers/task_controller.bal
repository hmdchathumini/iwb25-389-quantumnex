import ballerina/http;
import ballerina/io;
import ballerina/task;

type Task record {
    int id;
    string title;
    string description;
    string status;
};

service /tasks on new http:Listener(8080) {

    // Create a new task
    resource function post createTask(http:Caller caller, http:Request req) returns error? {
        Task newTask = check req.getJsonPayload();
        // Logic to save the task
        io:println("Task created: ", newTask);
        check caller->respond("Task created successfully");
    }

    // Get a task by ID
    resource function get getTask(int id, http:Caller caller) returns error? {
        // Logic to retrieve the task by ID
        Task task = {id: id, title: "Sample Task", description: "This is a sample task", status: "Pending"};
        check caller->respond(task);
    }

    // Delete a task by ID
    resource function delete deleteTask(int id, http:Caller caller) returns error? {
        // Logic to delete the task by ID
        io:println("Task deleted with ID: ", id);
        check caller->respond("Task deleted successfully");
    }
}