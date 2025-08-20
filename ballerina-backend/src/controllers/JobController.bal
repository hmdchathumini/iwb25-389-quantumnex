import ../db/DBUtil as dbModule;
import ballerina/sql;

// Create a new job/task
public function createJob(int customerId, string description) returns error? {
    sql:ParameterizedQuery insertQuery = `INSERT INTO jobs (customer_id, description, status) VALUES (${customerId}, ${description}, "Pending")`;
    var result = dbModule:db->execute(insertQuery);
    if result is sql:ExecutionResult {
        return;
    } else {
        return error("Failed to insert job: " + result.toString());
    }
}

// Get all jobs for a customer
public function getCustomerJobs(int customerId) returns stream<record {int id; int customer_id; int? worker_id; string description; string status;}, error?>|error {
    stream<record {int id; int customer_id; int? worker_id; string description; string status;}, error?> resultStream =
        dbModule:db->query(`SELECT id, customer_id, worker_id, description, status FROM jobs WHERE customer_id=${customerId}`);
    return resultStream;
}

// Update job status
public function updateJobStatus(int jobId, string status) returns error? {
    sql:ParameterizedQuery updateQuery = `UPDATE jobs SET status=${status} WHERE id=${jobId}`;
    var result = dbModule:db->execute(updateQuery);
    if result is sql:ExecutionResult {
        return;
    } else {
        return error("Failed to update job status: " + result.toString());
    }
}
