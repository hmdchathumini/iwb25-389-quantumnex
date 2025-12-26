import ballerina/http;
import ballerina/time;
import ballerina/uuid;
import ballerina/jwt;

public type Task record {
    string id;
    string title;
    string description;
    string location;
    string price;
    string status = "available";
    string? workerId = (); 
};


public type LoginRequest record {|
    string email;
    string password;
|};


public type LoginResponse record {
    string accessToken;
};


public type Response record {
    string status = "success";
    string message;
};


public type ErrorResponse record {
    string status = "error";
    string message;
};

isolated map<Task> tasks = {};
isolated lock tasksLock = new ();

function initializeTasks() {
    tasksLock.acquire();
    tasks["task_001"] = {
        id: "task_001",
        title: "Gardening & Weeding",
        description: "Need help with weeding and general garden tidy-up. All tools provided.",
        location: "Colombo",
        price: "$50",
        status: "available"
    };
    tasks["task_002"] = {
        id: "task_002",
        title: "Fix Leaky Faucet",
        description: "Small leak in a kitchen faucet, requires basic plumbing knowledge.",
        location: "Kandy",
        price: "$30",
        status: "available"
    };
    tasks["task_003"] = {
        id: "task_003",
        title: "Paint a Bedroom",
        description: "Looking for an experienced painter to repaint a single bedroom. Paint is provided.",
        location: "Galle",
        price: "$100",
        status: "available"
    };
    tasksLock.release();
}


service on start {
    initializeTasks();
}

listener http:Listener worknestListener = new (9091, auth = {
    'authenticator: jwt:JwtAuthenticatorConfig {
        issuer: "worknest.io",
        audience: "worknest-workers",
        secret: "super-secret-key-that-should-be-in-a-vault"
    }
});

service /worknest/worker on worknestListener {

    
    resource function post login(@http:Payload LoginRequest loginRequest) returns LoginResponse|ErrorResponse {
       
        if loginRequest.email == "test@worker.com" && loginRequest.password == "password123" {
           
            string token = check jwt:createToken(
                jwt:create(
                    { workerId: "test-worker-id" }, 
                    "worknest.io",
                    "worknest-workers",
                    1000, 
                    "super-secret-key-that-should-be-in-a-vault"
                )
            );
            return { accessToken: token };
        } else {
            return { status: "error", message: "Invalid email or password." };
        }
    }

   
    resource function get tasks() returns @http:Payload {
        json[]} | ErrorResponse {
        lock tasksLock {
            json[] availableTasks = tasks.entries().filter(task => task.status == "available");
            return availableTasks;
        }
    }


    isolated resource function get myTasks(jwt:AuthWorker auth) returns @http:Payload {
        json[]} | ErrorResponse {
        string workerId = auth.customClaims.workerId.toString();
        lock tasksLock {
            json[] workerSpecificTasks = tasks.entries().filter(task => task.workerId == workerId);
            return workerSpecificTasks;
        }
    }

  
    isolated resource function post acceptTask(@http:Payload json taskRequest, jwt:AuthWorker auth) returns Response|ErrorResponse {
        string taskId = <string>taskRequest.taskId;
        string workerId = auth.customClaims.workerId.toString();
        
        lock tasksLock {
            Task? existingTask = tasks.get(taskId);

            if existingTask is () {
                return { status: "error", message: "Task not found." };
            }

            if existingTask.status != "available" {
                return { status: "error", message: "Task is no longer available." };
            }

            existingTask.status = "accepted";
            existingTask.workerId = workerId;
            tasks[taskId] = existingTask;

            return { status: "success", message: "Task accepted successfully!" };
        }
    }


    isolated resource function post completeTask(@http:Payload json completionRequest, jwt:AuthWorker auth) returns Response|ErrorResponse {
        string taskId = <string>completionRequest.taskId;
        string workerId = auth.customClaims.workerId.toString();
        
        lock tasksLock {
            Task? existingTask = tasks.get(taskId);

            if existingTask is () {
                return { status: "error", message: "Task not found." };
            }
            
            if existingTask.workerId != workerId {
                return { status: "error", message: "Unauthorized: This task does not belong to the authenticated worker." };
            }

            if existingTask.status != "accepted" {
                return { status: "error", message: "Task cannot be completed as its status is not 'accepted'." };
            }

            existingTask.status = "completed";
            tasks[taskId] = existingTask;

            return { status: "success", message: "Task marked as completed." };
        }
    }
}
