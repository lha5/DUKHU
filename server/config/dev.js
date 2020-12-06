require('dotenv').config();

module.exports = {
  mongoURI: `mongodb+srv://admin:${process.env.MONGO_DB_PASSWORD}@dukhu.2oayf.mongodb.net/${process.env.MONGO_DB_DBNAME}?retryWrites=true&w=majority`
};