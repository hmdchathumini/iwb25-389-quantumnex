import ballerina/http;

service /payment on new http:Listener(8080) {

    resource function post create(http:Caller caller, http:Request req) returns error? {
        json|error payload = req.getJsonPayload();
        if payload is json {
            check caller->respond({ message: "Payment created", data: payload });
        } else {
            check caller->respond({ message: "Invalid payment data" });
        }
    }

    resource function get [string id](http:Caller caller, http:Request req, string id) returns error? {
        json payment = { id: id, status: "Success", amount: 100.0 };
        check caller->respond(payment);
    }

    resource function post refund(http:Caller caller, http:Request req) returns error? {
        json|error payload = req.getJsonPayload();
        if payload is json {
            check caller->respond({ message: "Payment refunded", data: payload });
        } else {
            check caller->respond({ message: "Invalid refund data" });
        }
    }
}
