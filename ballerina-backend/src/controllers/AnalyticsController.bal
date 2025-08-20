import ballerinax/mysql;

// Get simple analytics for the dashboard
public function getAnalytics() returns record {int activeUsers; int completedJobs; decimal revenue;}|error {
    int activeUsers = 0;
    int completedJobs = 0;
    decimal revenue = 0.0;

    // Initialize the MySQL client directly (replace with your actual config)
    mysql:Client db = check new (user = "root", password = "password", host = "localhost", port = 3306, database = "your_db");

    // Active users
    stream<record {int count;}, error?> activeStream = db->query(`SELECT COUNT(DISTINCT customer_id) AS count FROM jobs`);
    record {int count;}? activeRow = check activeStream.next();
    if activeRow is record {int count;} {
        activeUsers = activeRow.count;
    }
    check activeStream.close();

    // Completed jobs
    stream<record {int count;}, error?> completedStream = db->query(`SELECT COUNT(*) AS count FROM jobs WHERE status='Completed'`);
    record {int count;}? completedRow = check completedStream.next();
    if completedRow is record {int count;} {
        completedJobs = completedRow.count;
    }
    check completedStream.close();

    // Revenue
    stream<record {decimal total;}, error?> revenueStream = db->query(`SELECT SUM(amount) AS total FROM payments WHERE status='Completed'`);
    record {decimal total;}? revenueRow = check revenueStream.next();
    if revenueRow is record {decimal total;} {
        revenue = revenueRow.total;
    }
    check revenueStream.close();

    return { activeUsers: activeUsers, completedJobs: completedJobs, revenue: revenue };
}
