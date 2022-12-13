module.exports =
  process.env.NODE_ENV === 'production'
    ? {
      apiUrl: 'http://100.21.180.228:5000/api/',
      cipherKey: 'tuzmo-role',
    }
    : {
      apiUrl: 'http://100.21.180.228:5000/api/',
      cipherKey: 'tuzmo-role',
    }
