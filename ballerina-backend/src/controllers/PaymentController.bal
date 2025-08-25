import ballerinax/mysql;
import ballerina/sql;

// Update the following import to match your actual DB utility module path, for example:
import ballerina-backend.dbutil as dbModule;

// Record a payment
public function recordPayment(int jobId, decimal amount, string status) returns error? {
    mysql:ParameterizedQuery insertQuery = `INSERT INTO payments (job_id, amount, status) VALUES (${jobId}, ${amount}, ${status})`;
    var result = dbModule:db->execute(insertQuery);
    if result is sql:UpdateResult {
        return;
    } else {
        return error("Failed to record payment: " + result.toString());
    }
}

// Get payments for a customer (join with jobs)
public function getCustomerPayments(int customerId) returns stream<record {int id; int job_id; decimal amount; string status;}, error?>|error {
    stream<record {int id; int job_id; decimal amount; string status;}, error?> resultStream =
        dbModule:db->query(`
            SELECT p.id, p.job_id, p.amount, p.status 
            FROM payments p
            JOIN jobs j ON p.job_id = j.id
            WHERE j.customer_id=${customerId}
        `);
    return resultStream;
}
