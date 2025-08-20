import ballerina/http;
import controllers/JobController;

service /jobs on new http:Listener(8080) {

    resource function post create(http:Caller caller, http:Request req) returns error? {
        json payload = check req.getJsonPayload();
        int customerId = <int>payload.customer_id;
        string description = <string>payload.description;

        var res = JobController:createJob(customerId, description);
        if res is error {
            check caller->respond({ success: false, error: res.message() });
        } else {
            check caller->respond({ success: true, message: "Task posted!" });
        }
    }

    resource function get list(http:Caller caller, int customerId) returns error? {
        var resultStream = JobController:getCustomerJobs(customerId);
        if resultStream is error {
            check caller->respond({ success: false, error: resultStream.message() });
        } else {
            json jobs = [];
            check from var row in resultStream do {
                jobs.push(row);
            };
            check caller->respond(jobs);
        }
    }

    resource function put updateStatus(http:Caller caller, http:Request req) returns error? {
        json payload = check req.getJsonPayload();
        int jobId = <int>payload.job_id;
        string status = <string>payload.status;

        var res = JobController:updateJobStatus(jobId, status);
        if res is error {
            check caller->respond({ success: false, error: res.message() });
        } else {
            check caller->respond({ success: true, message: "Task status updated!" });
        }
    }
}
