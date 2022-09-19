module.exports = {
  development: {
    jwtSecret: "!HasGMS_APP_ATIF",
    dbPath: "localhost:27017/",
    dbName: "gms-db",
    stripePublicKeys: "pk_test_51LiYogGjrZbn5N9jH0ICgEMgxrN6RYSnwcB2FBxadvHQFQvmzFKIBnd8X02bi3eM3M7i0BYA51pa49DzE1OJagkP00CpmqqQMM",
    stripeSecretKeys: "sk_test_51LiYogGjrZbn5N9jQIXup43msdTuGuB3KH3eqTgzJXsD34WHVQVyNHOZlLWjErwQDqhicfYFBIKcZ39gj5KH1i3000EJqtOH3r",
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
