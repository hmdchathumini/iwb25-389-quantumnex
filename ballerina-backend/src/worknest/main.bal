import ballerina/http;
import ballerina/log;

// UserController class
class UserController {
    function createUser(http:Caller caller, http:Request req) returns error? {
        // Implement logic here
        return;
    }
    function getUser(http:Caller caller, string id) returns error? {
        // Implement logic here
        return;
    }
    function deleteUser(http:Caller caller, string id) returns error? {
        // Implement logic here
        return;
    }
}

// TaskController class
class TaskController {
    function createTask(http:Caller caller, http:Request req) returns error? {
        // Implement logic here
        return;
    }
    function getTask(http:Caller caller, string id) returns error? {
        // Implement logic here
        return;
    }
    function deleteTask(http:Caller caller, string id) returns error? {
        // Implement logic here
        return;
    }
}

// PaymentController class
class PaymentController {
    function createPayment(http:Caller caller, http:Request req) returns error? {
        // Implement logic here
        return;
    }
    function getPayment(http:Caller caller, string id) returns error? {
        // Implement logic here
        return;
    }
    function refundPayment(http:Caller caller, http:Request req) returns error? {
        // Implement logic here
        return;
    }
}

isolated UserController user_controller = new UserController();
isolated TaskController task_controller = new TaskController();
isolated PaymentController payment_controller = new PaymentController();

service /api on new http:Listener(8080) {

    // User routes
    resource function post user/create(http:Caller caller, http:Request req) returns error? {
        return user_controller.createUser(caller, req);
    }

    resource function get user/[string id](http:Caller caller, string id) returns error? {
        return user_controller.getUser(caller, id);
    }

    resource function delete user/{id}(http:Caller caller, string id) returns error? {
        return user_controller.deleteUser(caller, id);
    }

    // Task routes
    resource function post task/create(http:Caller caller, http:Request req) returns error? {
        return task_controller.createTask(caller, req);
    }

    resource function get task/[string id](http:Caller caller, string id) returns error? {
        return task_controller.getTask(caller, id);
    }

    resource function delete task/{id}(http:Caller caller, string id) returns error? {
        return task_controller.deleteTask(caller, id);
    }

    // Payment routes
    resource function post payment/create(http:Caller caller, http:Request req) returns error? {
        return payment_controller.createPayment(caller, req);
    }

    resource function get payment/{id}(http:Caller caller, string id) returns error? {
        return payment_controller.getPayment(caller, id);
    }

    resource function post payment/refund(http:Caller caller, http:Request req) returns error? {
        return payment_controller.refundPayment(caller, req);
    }
}
