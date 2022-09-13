module.exports =
  process.env.NODE_ENV === 'production'
    ? {
        apiUrl: 'http://3.13.213.181:3000/api/v1/',
        cipherKey: 'tuzmo-role',
        s3Path: 'https://tuzmo-stag.s3.amazonaws.com/',
      }
    : {
        apiUrl: 'http://localhost:5000/api/',
        cipherKey: 'tuzmo-role',
        s3Path: 'https://tuzmo-stag.s3.amazonaws.com/',
      }
