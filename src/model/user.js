const mongo=require("mongoose");

const admin=mongo.Schema({
    name:{type:String},
    email:{type: String},
    pass:{type: String},
    mobile:{type:Number},
    dateOfBirth:{type:String},
    state:{type:String},
    address:{type:String},
    amount:{type:Number},
    city:{type:String},
    address:{type:String},
    gender:{type:String},
    parent_id:{type:Number},
    user_id:{type:Number},
    active:{type:Boolean},
    otp:{type:Number},
});
module.exports=mongo.model("admin",admin);
