module.exports = {
  development: {
    jwtSecret: "!HasGMS_APP_ATIF",
    dbPath: "localhost:27017/",
    dbName: "gms-db",
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: "postgres",
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
  },
};
