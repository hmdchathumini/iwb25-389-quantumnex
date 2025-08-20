public type Job record {
    int id?;
    int customer_id;
    int? worker_id;
    string description;
    string status?;
    string created_at?;
};
