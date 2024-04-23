module.exports = {
  name: 'Free Pet Health API',
  env: process.env.NODE_ENV,
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT,
};
