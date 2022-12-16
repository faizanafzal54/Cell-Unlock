module.exports =
  process.env.NODE_ENV === 'production'
    ? {
      apiUrl: 'https://cellunlocking.us/api/',
    }
    : {
      apiUrl: 'http://localhost:5000/api/',
    }
