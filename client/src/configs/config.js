module.exports =
  process.env.NODE_ENV === 'production'
    ? {
        apiUrl: 'https://gms-system.herokuapp.com/api/',
        cipherKey: 'tuzmo-role',
        s3Path: 'https://tuzmo-stag.s3.amazonaws.com/',
      }
    : {
        apiUrl: 'http://localhost:5000/api/',
        cipherKey: 'tuzmo-role',
        s3Path: 'https://tuzmo-stag.s3.amazonaws.com/',
      }
