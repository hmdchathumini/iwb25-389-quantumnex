import ballerina/http;
import ballerina/sql;
import db/DBUtil as dbModule;

service /workers on new http:Listener(8080) {

    resource function post add(http:Caller caller, http:Request req) returns error? {
        json payload = check req.getJsonPayload();
        string name = <string>payload.name;
        string skill = <string>payload.skill;
        string phone = <string>payload.phone;

        sql:ParameterizedQuery insertQuery = `INSERT INTO workers (name, skill, phone) 
                                              VALUES (${name}, ${skill}, ${phone})`;
        var result = dbModule:db->execute(insertQuery);

        if result is sql:ExecutionResult {
            check caller->respond({ success: true, message: "Worker added!" });
        } else {
            check caller->respond({ success: false, error: result.toString() });
        }
    }

    resource function get list(http:Caller caller) returns error? {
        stream<record {int id; string name; string skill; string phone; float rating;}, error?> resultStream =
            dbModule:db->query(`SELECT id, name, skill, phone, rating FROM workers`);

        json workers = [];
        check from var row in resultStream do {
            workers.push(row);
        };
        check caller->respond(workers);
    }
}
