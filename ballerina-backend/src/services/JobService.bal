import ballerina/http;

service /jobs on new http:Listener(8080) {

    resource function post create(http:Caller caller, http:Request req) returns error? {
        // Mock job creation logic
        json response = { success: true, message: "Task posted!" };
        check caller->respond(response);
    }

    resource function get create(http:Caller caller) returns error? {
        json response = { success: false, message: "Use POST for creating jobs." };
        check caller->respond(response);
    }

    resource function get list/[int customerId](http:Caller caller) returns error? {
        // Mock job list response
        json[] jobs = [];
        check caller->respond(jobs);
    }

    resource function put updateStatus(http:Caller caller, http:Request req) returns error? {
        json payload = check req.getJsonPayload();
        json jobIdJson = check payload.job_id;
        json statusJson = check payload.status;
        
        _ = check jobIdJson.cloneWithType(int);
        _ = check statusJson.cloneWithType(string);

        // Mock status update logic
        json response = { success: true, message: "Task status updated!" };
        check caller->respond(response);
    }
}
