import ../db/DBUtil as dbModule;
import ballerina/sql;

public function sendNotification(int customerId, string message) returns error? {
    sql:ParameterizedQuery insertQuery = `INSERT INTO notifications (customer_id, message) VALUES (${customerId}, ${message})`;
    var result = dbModule:db->execute(insertQuery);
    if result is sql:ExecutionResult {
        return;
    } else {
        return error("Failed to send notification: " + result.toString());
    }
}

public function getNotifications(int customerId) returns stream<record {int id; int customer_id; string message; boolean seen;}, error?>|error {
    stream<record {int id; int customer_id; string message; boolean seen;}, error?> resultStream =
        dbModule:db->query(`SELECT id, customer_id, message, seen FROM notifications WHERE customer_id=${customerId} ORDER BY created_at DESC`);
    return resultStream;
}

public function markNotificationSeen(int notificationId) returns error? {
    sql:ParameterizedQuery updateQuery = `UPDATE notifications SET seen=TRUE WHERE id=${notificationId}`;
    var result = dbModule:db->execute(updateQuery);
    if result is sql:ExecutionResult {
        return;
    } else {
        return error("Failed to mark notification as seen: " + result.toString());
    }
}
