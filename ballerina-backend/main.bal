import ballerina/http;

// Import services as modules
import user_service;
import worker_service;
import payment_service;
import analytics_service;

listener http:Listener httpListener = new (8080);

// Attach all services to the listener using service objects
service /user on httpListener = new user_service:UserService();
service /worker on httpListener = new worker_service:WorkerService();
service /job on httpListener = new job_service:JobService();
service /analytics on httpListener = new analytics_service:AnalyticsService();
