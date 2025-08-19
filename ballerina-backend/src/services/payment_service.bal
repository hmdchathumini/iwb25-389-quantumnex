import ballerina/http;
import ballerina/io;

type Payment record {
    int id;
    float amount;
    string userId;
    string status;
};

service /payment on new http:Listener(8080) {

    resource function post createPayment(http:Caller caller, http:Request req) returns error? {
        Payment payment = check req.getJsonPayload();
        // Logic to process the payment
        io:println("Processing payment: ", payment);
        // Respond with success
        check caller->respond("Payment created successfully");
    }

    resource function get getPayment(http:Caller caller, int id) returns error? {
        // Logic to retrieve payment by id
        io:println("Retrieving payment with id: ", id);
        // Respond with payment details
        check caller->respond("Payment details for id: " + id);
    }

    resource function post refundPayment(http:Caller caller, int id) returns error? {
        // Logic to process refund
        io:println("Processing refund for payment id: ", id);
        // Respond with success
        check caller->respond("Payment refunded successfully");
    }
}