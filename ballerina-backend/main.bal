import ballerina/http;
import ballerina/log;

// Import services as modules
import services.user_service;
import services.worker_service;
import services.job_service;
import services.payment_service;
import services.analytics_service;

public function main() returns error? {
    // HTTP listener for all services
    listener http:Listener listener = new (8080);

    // Attach all services to the listener
    check new user_service:UserService(listener);
    check new worker_service:WorkerService(listener);
    check new job_service:JobService(listener);
    check new payment_service:PaymentService(listener);
    check new analytics_service:AnalyticsService(listener);

    log:printInfo("Household backend services started on http://localhost:8080");
}
