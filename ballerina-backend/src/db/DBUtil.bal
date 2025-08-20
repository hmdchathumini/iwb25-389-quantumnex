import ballerinax/mysql;

configurable string dbHost = ?;
configurable int dbPort = ?;
configurable string dbUser = ?;
configurable string dbPassword = ?;
configurable string dbName = ?;

// MySQL client
mysql:Client db = check new (host = dbHost,
    port = dbPort,
    name = dbName,
    username = dbUser,
    password = dbPassword,
    connectionPool = { maxOpenConnections: 5 });
