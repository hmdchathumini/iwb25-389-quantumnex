import ballerina/http;

// Services
import services/UserService;
import services/WorkerService;
import services/JobService;
import services/PaymentService;
import services/AnalyticsService;
import services/NotificationService;

public function main() returns error? {
    // HTTP listener for all services
    http:Listener listener = check new (8080);

    // Attach all services to the listener
    check new UserService(listener);
    check new WorkerService(listener);
    check new JobService(listener);
    check new PaymentService(listener);
    check new AnalyticsService(listener);
    check new NotificationService(listener);

    log:printInfo("Household backend services started on http://localhost:8080");
    
    // Keep the service running
    runtime:sleep(3600*24*365); // run indefinitely (1 year)
}
