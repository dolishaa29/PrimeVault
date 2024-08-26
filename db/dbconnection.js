const mongo=require("mongoose");
exports.connectDB=()=>
{
    let conc=mongo.connect("mongodb://127.0.0.1:27017/admin");
    console.log("database connected");
}