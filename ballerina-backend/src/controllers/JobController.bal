import ballerina/sql;
import ballerinax/mysql;
// import db.DBUtil; // Removed: Not needed if DBUtil is in the same package or directory

// Initialize the MySQL client (update the config as needed)
mysql:Client db = check new ("localhost", "root", "password", "worknest_db");

// Create a new job/task
public function createJob(int customerId, string description) returns error? {
    sql:ParameterizedQuery insertQuery =
        `INSERT INTO jobs (customer_id, description, status) VALUES (${customerId}, ${description}, 'pending')`;
    _ = check db->execute(insertQuery);
}

// Get all jobs for a customer
public function getCustomerJobs(int customerId)
    returns stream<record {int id; int customer_id; int? worker_id; string description; string status;}, error?> {
    sql:ParameterizedQuery selectQuery =
        `SELECT id, customer_id, worker_id, description, status FROM jobs WHERE customer_id = ${customerId}`;
    return db->query(selectQuery);
}

// Update job status
public function updateJobStatus(int jobId, string status) returns error? {
    sql:ParameterizedQuery updateQuery =
        `UPDATE jobs SET status = ${status} WHERE id = ${jobId}`;
    _ = check db->execute(updateQuery);
}
