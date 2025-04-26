export default () => ({
    minio: {
      endPoint: process.env.MINIO_ENDPOINT || 'http://minio:9000',
      port:process.env.MINIO_PORT || 9000,
      useSSL: process.env.MINIO_USE_SSL === 'false',
      accessKey: process.env.MINIO_ACCESS_KEY || 'qbYVVYNTXb0WbbOqROkQ',
      secretKey: process.env.MINIO_SECRET_KEY || 'fB0jYsG1H6TDhpNsqrJILaooH7aMG5hemlOBgUbC',
      bucketName: process.env.MINIO_BUCKET_NAME || 'media',
    },
  });