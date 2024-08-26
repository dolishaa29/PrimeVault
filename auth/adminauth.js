const jwt = require("jsonwebtoken");
const admin=require("../src/model/user");


module.exports = async (req, res, next) => {
  try {
    if (req.cookies.jwt != undefined && req.cookies.jwt != "") {
      const token = req.cookies.jwt;
      const { _id } = jwt.verify(token, "aabbcc");
      console.log(_id);
      req.user = await admin.findOne({ _id });
      if (req.user) {
        return next();
      } else {
        res.render("adminlogin");
      }
    } else {
      res.render("adminlogin");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/register");
  }
};
