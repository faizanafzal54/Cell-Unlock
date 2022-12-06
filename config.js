module.exports = {
  production: {
    jwtSecret: process.env.JWT_SECRET,
    dbPath: process.env.DATABASE_LIVE_URL,
    stripePublicKeys: process.env.STRIPE_PUBLIC_KEY,
    stripeSecretKeys: process.env.STRIPE_SECRET_KEY,
  },
  development: {
    dbPath: process.env.DATABASE_LOCAL_URL,
    jwtSecret: process.env.JWT_SECRET,
    stripePublicKeys: process.env.STRIPE_PUBLIC_KEY,
    stripeSecretKeys: process.env.STRIPE_SECRET_KEY,
    dbName: "gms-db",
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: "postgres",
  },
};
