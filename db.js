const { MongoClient } = require("salvage.db");
const db = new MongoClient({
  schema: {
    name: "Salvage2",
  },
  mongoURI: require("./token.json").Mongo,
});
module.exports = db;
