module.exports =
  process.env.NODE_ENV === 'production'
    ? {
        apiUrl: 'http://100.21.180.228:5000/',
        cipherKey: 'tuzmo-role',
        s3Path: 'https://tuzmo-stag.s3.amazonaws.com/',
      }
    : {
        apiUrl: 'http://localhost:5000/api/',
        cipherKey: 'tuzmo-role',
        s3Path: 'https://tuzmo-stag.s3.amazonaws.com/',
      }
