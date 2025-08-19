import ballerina/http;
import ballerina/io;
import ballerina/config;

type Payment record {
    int id;
    float amount;
    string userId;
    string status;
};

service /payment on new http:Listener(8080) {

    resource function post createPayment(http:Caller caller, http:Request req) returns error? {
        Payment payment = check req.getJsonPayload();
        // Logic to process payment
        io:println("Creating payment: ", payment);
        // Assume payment is processed successfully
        payment.status = "completed";
        check caller->respond(payment);
    }

    resource function get getPayment(http:Caller caller, int id) returns error? {
        // Logic to retrieve payment by id
        Payment payment = {id: id, amount: 100.0, userId: "user123", status: "completed"};
        io:println("Retrieving payment: ", payment);
        check caller->respond(payment);
    }

    resource function post refundPayment(http:Caller caller, http:Request req) returns error? {
        Payment payment = check req.getJsonPayload();
        // Logic to process refund
        io:println("Refunding payment: ", payment);
        // Assume refund is processed successfully
        payment.status = "refunded";
        check caller->respond(payment);
    }
}