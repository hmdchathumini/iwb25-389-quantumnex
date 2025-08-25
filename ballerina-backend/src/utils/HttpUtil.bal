import ballerina/http;
import ballerina/log;

public function respondError(http:Caller caller, int httpStatus, string message) returns error? {
    log:printError(message);
    http:Response res = new;
    res.statusCode = httpStatus;
    // set a JSON body { error: "...", timestamp: "..." }
    check res.setJsonPayload({ error: message, ts: time:toString(time:currentTime()) });
    check caller->respond(res);
}
