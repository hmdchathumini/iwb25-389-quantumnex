import ballerina/http;
import ballerina/sql;
import db/DBUtil as dbModule;

service /customers on new http:Listener(8080) {

    resource function post register(http:Caller caller, http:Request req) returns error? {
        json payload = check req.getJsonPayload();
        string name = <string>payload.name;
        string email = <string>payload.email;
        string phone = <string>payload.phone;
        string password = <string>payload.password;

        sql:ParameterizedQuery insertQuery = `INSERT INTO customers (name,email,phone,password)
                                              VALUES (${name},${email},${phone},${password})`;
        var result = dbModule:db->execute(insertQuery);
        if result is sql:ExecutionResult {
            check caller->respond({ success: true, message: "Customer registered!" });
        } else {
            check caller->respond({ success: false, error: result.toString() });
        }
    }

    resource function get list(http:Caller caller) returns error? {
        stream<record {int id; string name; string email; string phone;}, error?> resultStream =
            dbModule:db->query(`SELECT id,name,email,phone FROM customers`);

        json customers = [];
        check from var row in resultStream do {
            customers.push(row);
        };
        check caller->respond(customers);
    }
}
