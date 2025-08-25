import ballerina/http;

// In-memory data stores
map<json> users = {};
map<json> jobs = {};
map<json> payments = {};
map<json> notifications = {};

int userIdSeq = 1;
int jobIdSeq = 1;
int paymentIdSeq = 1;
int notificationIdSeq = 1;

service /api on new http:Listener(8080) {

    // ========== User Routes ==========
    resource function post users(http:Caller caller, http:Request req) returns error? {
        json payload = check req.getJsonPayload();
        check createUser(caller, payload);
        return;
    }

    resource function get users/[string userId](http:Caller caller, string userIdPath) returns error? {
        check getUser(caller, userIdPath);
        return;
    }

    resource function delete users/[string id](http:Caller caller, string idPath) returns error? {
        check deleteUser(caller, idPath);
        return;
    }

    // ========== Job Routes ==========
    resource function post jobs(http:Caller caller, http:Request req) returns error? {
        json payload = check req.getJsonPayload();
        int customerId = checkpanic payload.customerId.ensureType(int);
        string description = checkpanic payload.description.ensureType(string);
        check createJobInMemory(caller, customerId, description);
        return;
    }

    resource function put jobs/[int id]/status(http:Caller caller, http:Request req, int idPath) returns error? {
        json payload = check req.getJsonPayload();
        string status = checkpanic payload.status.ensureType(string);
        check updateJobStatusInMemory(caller, idPath, status);
        return;
    }

    // ========== Payment Routes ==========
    resource function post payments(http:Caller caller, http:Request req) returns error? {
        json payload = check req.getJsonPayload();
        int jobId = checkpanic payload.jobId.ensureType(int);
        decimal amount = checkpanic payload.amount.ensureType(decimal);
        string status = checkpanic payload.status.ensureType(string);
        check recordPaymentInMemory(caller, jobId, amount, status);
        return;
    }

    // ========== Notification Routes ==========
    resource function post notifications(http:Caller caller, http:Request req) returns error? {
        json payload = check req.getJsonPayload();
        int customerId = checkpanic payload.customerId.ensureType(int);
        string message = checkpanic payload.message.ensureType(string);
        check sendNotificationInMemory(caller, customerId, message);
        return;
    }

    // ========== Analytics ==========
    resource function get analytics(http:Caller caller) returns error? {
        var result = getAnalyticsInMemory();
        if result is error {
            check caller->respond({ message: "Failed to fetch analytics" });
        } else {
            check caller->respond(result);
        }
        return;
    }
}

// ========== User Functions ==========
function createUser(http:Caller caller, json payload) returns error? {
    string name = checkpanic payload.name.ensureType(string);
    int id = userIdSeq;
    userIdSeq += 1;
    users[id.toString()] = { id: id, name: name };
    check caller->respond({ message: "User created", id: id });
    return;
}

function getUser(http:Caller caller, string id) returns error? {
    if users.hasKey(id) {
        check caller->respond(users[id]);
    } else {
        http:Response res = new;
        res.statusCode = 404;
        res.setPayload({ message: "User not found" });
        check caller->respond(res);
    }
    return;
}

function deleteUser(http:Caller caller, string id) returns error? {
    if users.hasKey(id) {
        _ = users.remove(id);
        check caller->respond({ message: "User deleted" });
    } else {
        http:Response res = new;
        res.statusCode = 404;
        res.setPayload({ message: "User not found" });
        check caller->respond(res);
    }
    return;
}

// ========== Job Functions ==========
function createJobInMemory(http:Caller caller, int customerId, string description) returns error? {
    int id = jobIdSeq;
    jobIdSeq += 1;
    jobs[id.toString()] = { id: id, customerId: customerId, description: description, status: "pending" };
    check caller->respond({ message: "Job created", id: id });
    return;
}

function updateJobStatusInMemory(http:Caller caller, int id, string status) returns error? {
    string idStr = id.toString();
    if jobs.hasKey(idStr) {
        map<json> job = <map<json>>jobs[idStr];
        job["status"] = status;
        jobs[idStr] = job;
        check caller->respond({ message: "Job updated" });
    } else {
        http:Response res = new;
        res.statusCode = 404;
        res.setPayload({ message: "Job not found" });
        check caller->respond(res);
    }
    return;
}

// ========== Payment Functions ==========
function recordPaymentInMemory(http:Caller caller, int jobId, decimal amount, string status) returns error? {
    int id = paymentIdSeq;
    paymentIdSeq += 1;
    payments[id.toString()] = { id: id, jobId: jobId, amount: amount, status: status };
    check caller->respond({ message: "Payment recorded", id: id });
    return;
}

// ========== Notification Functions ==========
function sendNotificationInMemory(http:Caller caller, int customerId, string message) returns error? {
    int id = notificationIdSeq;
    notificationIdSeq += 1;
    notifications[id.toString()] = { id: id, customerId: customerId, message: message };
    check caller->respond({ message: "Notification sent", id: id });
    return;
}

// ========== Analytics ==========
function getAnalyticsInMemory() returns json|error {
    return {
        totalUsers: users.length(),
        totalJobs: jobs.length(),
        totalPayments: payments.length(),
        totalNotifications: notifications.length()
    };
}
