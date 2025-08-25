import ballerinax/mysql;
import ballerina/sql;

// Helper function to get database client
function getDbClient() returns mysql:Client|error {
    return new mysql:Client(
        "localhost",
        "root",
        "",
        "worknest",
        3306
    );
}

// Send a new notification to a customer
public function sendNotification(int customerId, string message) returns error? {
    mysql:Client dbClient = check getDbClient();
    sql:ParameterizedQuery insertQuery = `INSERT INTO notifications (customer_id, message, seen) VALUES (${customerId}, ${message}, FALSE)`;
    _ = check dbClient->execute(insertQuery);
    check dbClient.close();
}

// Get all notifications for a customer
public function getNotifications(int customerId) returns stream<record {
    int id;
    int customer_id;
    string message;
    boolean seen;
}, error?>|error {
    mysql:Client dbClient = check getDbClient();
    sql:ParameterizedQuery selectQuery = `SELECT id, customer_id, message, seen FROM notifications WHERE customer_id=${customerId} ORDER BY created_at DESC`;
    stream<record {
        int id;
        int customer_id;
        string message;
        boolean seen;
    }, error?> resultStream = dbClient->query(selectQuery);
    // Note: The stream consumer should close the dbClient after use.
    return resultStream;
}

// Mark a notification as seen
public function markNotificationSeen(int notificationId) returns error? {
    mysql:Client dbClient = check getDbClient();
    sql:ParameterizedQuery updateQuery = `UPDATE notifications SET seen=TRUE WHERE id=${notificationId}`;
    _ = check dbClient->execute(updateQuery);
    check dbClient.close();
}
