import ballerina/sql;

public function streamToJson(stream<record {}, error?> resultStream) returns json {
    json arr = [];
    error? e = resultStream.forEach(function(record {} r) {
        arr.push(r);
    });
    return arr;
}
