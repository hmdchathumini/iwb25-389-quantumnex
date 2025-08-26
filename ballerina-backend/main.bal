import ballerina/http;
import ballerinax/mysql;
import ballerina/sql;

// Config
configurable string databaseHost = ?;
configurable int databasePort = ?;
configurable string databaseUser = ?;
configurable string databasePassword = ?;
configurable string databaseName = ?;

// Data types
type User record {|
    int id;
    string name;
|};

type Job record {|
    int id;
    int customerId;
    string description;
    string status;
|};

type Payment record {|
    int id;
    int jobId;
    decimal amount;
    string status;
|};

type Notification record {|
    int id;
    int customerId;
    string message;
|};

type CreateUserReq record {|
    string name;
|};

type CreateJobReq record {|
    int customerId;
    string description;
|};

type UpdateJobStatusReq record {|
    string status;
|};

type CreatePaymentReq record {|
    int jobId;
    decimal amount;
    string status;
|};

type CreateNotificationReq record {|
    int customerId;
    string message;
|};

// In-memory stores and ID sequences
map<User> users = {};
map<Job> jobs = {};
map<Payment> payments = {};
map<Notification> notifications = {};

int userIdSeq = 1;
int jobIdSeq = 1;
int paymentIdSeq = 1;
int notificationIdSeq = 1;

// DB client
mysql:Client dbClient;

public function init() returns error? {
    dbClient = check new (host = databaseHost,
        port = databasePort,
        user = databaseUser,
        password = databasePassword,
        database = databaseName
    );
}

public function closeDbClient() returns error? {
    if dbClient is mysql:Client {
        check dbClient.close();
    }
}

// Service
service /api on new http:Listener(8080) {

    // ========== User Routes ==========
    resource function post users(@http:Payload CreateUserReq payload) returns json {
        int id = userIdSeq;
        userIdSeq += 1;
        User u = {id, name: payload.name};
        users[id.toString()] = u;
        return { message: "User created", id };
    }

    resource function get users/[string userId]() returns json|http:Response {
        User? u = users[userId];
        if u is User {
            return u;
        }
        http:Response res = new;
        res.statusCode = 404;
        res.setPayload({ message: "User not found" });
        return res;
    }

    resource function delete users/[string id]() returns json|http:Response {
        if users.hasKey(id) {
            _ = users.remove(id);
            return { message: "User deleted" };
        }
        http:Response res = new;
        res.statusCode = 404;
        res.setPayload({ message: "User not found" });
        return res;
    }

    // ========== Job Routes ==========
    resource function post jobs(@http:Payload CreateJobReq payload) returns json {
        int id = jobIdSeq;
        jobIdSeq += 1;
        Job job = { id, customerId: payload.customerId, description: payload.description, status: "pending" };
        jobs[id.toString()] = job;
        return { message: "Job created", id };
    }

    resource function put jobs/[int id]/status(@http:Payload UpdateJobStatusReq payload) returns json|http:Response {
        string key = id.toString();
        Job? job = jobs[key];
        if job is Job {
            job.status = payload.status;
            jobs[key] = job;
            return { message: "Job updated" };
        }
        http:Response res = new;
        res.statusCode = 404;
        res.setPayload({ message: "Job not found" });
        return res;
    }

    // ========== Payment Routes ==========
    resource function post payments(@http:Payload CreatePaymentReq payload) returns json {
        int id = paymentIdSeq;
        paymentIdSeq += 1;
        Payment p = { id, jobId: payload.jobId, amount: payload.amount, status: payload.status };
        payments[id.toString()] = p;
        return { message: "Payment recorded", id };
    }

    // ========== Notification Routes ==========
    resource function post notifications(@http:Payload CreateNotificationReq payload) returns json {
        int id = notificationIdSeq;
        notificationIdSeq += 1;
        Notification n = { id, customerId: payload.customerId, message: payload.message };
        notifications[id.toString()] = n;
        return { message: "Notification sent", id };
    }

    // ========== Analytics ==========
    resource function get analytics() returns json {
        return {
            totalUsers: users.length(),
            totalJobs: jobs.length(),
            totalPayments: payments.length(),
            totalNotifications: notifications.length()
        };
    }
}

public function main() returns error? {
    // Simple DB health check
    sql:ParameterizedQuery query = `SELECT 1`;
    stream<record {| anydata...; |}, error> rs = check dbClient->query(query);
    check rs.close();
}
