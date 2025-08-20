public type Notification record {
    int id?;
    int customer_id;
    string message;
    boolean seen?;
    string created_at?;
};
