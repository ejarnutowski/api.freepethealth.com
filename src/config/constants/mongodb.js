module.exports = {
  uri: {
    development: 'mongodb://mongo:27017/db',
    production: `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/?retryWrites=true&w=majority&appName=${process.env.MONGODB_APP_NAME}`,
  },
};