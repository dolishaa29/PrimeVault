const mongo = require("mongoose");

const transaction = mongo.Schema({
  name: { type: String },
  type: { type: String },
  amount: { type: Number },
  email: { type: String},
  date: { type: Date, default: Date.now() },
});
module.exports = mongo.model("transaction", transaction);
