import ballerina/http;
import ballerina/sql;
import db/DBUtil as dbModule;

service /payments on new http:Listener(8080) {

    resource function post add(http:Caller caller, http:Request req) returns error? {
        json payload = check req.getJsonPayload();
        int jobId = <int>payload.jobId;
        decimal amount = <decimal>payload.amount;

        sql:ParameterizedQuery insertQuery = `INSERT INTO payments (job_id, amount) VALUES (${jobId}, ${amount})`;
        var result = dbModule:db->execute(insertQuery);

        if result is sql:ExecutionResult {
            check caller->respond({ success: true, message: "Payment recorded!" });
        } else {
            check caller->respond({ success: false, error: result.toString() });
        }
    }

    resource function get list(http:Caller caller) returns error? {
        stream<record {int id; int job_id; decimal amount; string status;}, error?> resultStream =
            dbModule:db->query(`SELECT id, job_id, amount, status FROM payments`);

        json payments = [];
        check from var row in resultStream do {
            payments.push(row);
        };
        check caller->respond(payments);
    }
}
