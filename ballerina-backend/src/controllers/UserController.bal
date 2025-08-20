import ballerina/http;

type User record {|
    int id;
    string name;
    string email;
    string password;
|};

class UserController {
    private map<User> users = {};

    function createUser(http:Caller caller, http:Request req) returns error? {
        json|error payload = req.getJsonPayload();
        if payload is json {
            User|error user = payload.cloneWithType(User);
            if user is User {
                self.users[user.id.toString()] = user;
                check caller->respond({ message: "User created", data: user });
            } else {
                check caller->respond({ message: "Invalid user data" });
            }
        } else {
            check caller->respond({ message: "Invalid user data" });
        }
    }

    function getUser(http:Caller caller, string id) returns error? {
        User? user = self.users[id];
        if user is User {
            check caller->respond(user);
        } else {
            check caller->respond({ message: "User not found" });
        }
    }

    function deleteUser(http:Caller caller, string id) returns error? {
        if self.users.hasKey(id) {
            _ = self.users.remove(id);
            check caller->respond({ message: "User deleted: " + id });
        } else {
            check caller->respond({ message: "User not found" });
        }
    }
}

UserController userController = new UserController();

service /users on new http:Listener(8080) {

    resource function post .(http:Caller caller, http:Request req) returns error? {
        check userController.createUser(caller, req);
    }

    resource function get .(http:Caller caller, int id) returns error? {
        check userController.getUser(caller, id.toString());
    }

    resource function delete .(http:Caller caller, int id) returns error? {
        check userController.deleteUser(caller, id.toString());
    }
}
