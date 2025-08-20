import ballerina/http;
import db/DBUtil as dbModule;

service /analytics on new http:Listener(8080) {

    resource function get stats(http:Caller caller) returns error? {
        int activeUsers = 0;
        int completedJobs = 0;
        decimal revenue = 0;

        var usersRes = dbModule:db->query(`SELECT COUNT(*) as c FROM customers`);
        if usersRes is stream<record {int c;}, error?> {
            check from var row in usersRes do { activeUsers = row.c; };
        }

        var jobsRes = dbModule:db->query(`SELECT COUNT(*) as c FROM jobs WHERE status='completed'`);
        if jobsRes is stream<record {int c;}, error?> {
            check from var row in jobsRes do { completedJobs = row.c; };
        }

        var revenueRes = dbModule:db->query(`SELECT COALESCE(SUM(amount),0) as t FROM payments WHERE status='paid'`);
        if revenueRes is stream<record {decimal t;}, error?> {
            check from var row in revenueRes do { revenue = row.t; };
        }

        json analytics = { activeUsers: activeUsers, completedJobs: completedJobs, revenue: revenue };
        check caller->respond(analytics);
    }
}
