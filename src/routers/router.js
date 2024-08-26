let express = require("express");
let router = express.Router();

let {
  adduser_cont,
  addusers_cont,
  viewuser_cont,
  login_cont,
  admin_cont,
  register_cont,
  registerpage_cont,
  adminprofile_cont,
  updateprofile,
  changepass,
  change_pass,
  addproduct,
  viewproduct,
  dashboard,
  update,
  update_cont,
  delete_cont,
  block_cont,
  otp,
  email_cont,
  otpver_cont,
  addamt_cont,
  widamt_cont,
  transaction_cont,
  addamt,
  widamt,
  search_cont,
  signout,
} = require("../controllers/controller"); 
const auth = require("../../auth/adminauth");

router.get("/", admin_cont);
router.get("/addusers", auth, addusers_cont);
router.get("/view", auth, viewuser_cont);
router.post("/adduser", auth, adduser_cont);
router.post("/loginpage", login_cont);
router.get("/register", register_cont);
router.get("/adminprofile", auth, adminprofile_cont);
router.post("/update_profile", auth, updateprofile);
router.get("/changepass", auth, changepass);
router.post("/change_pass", auth, change_pass);
router.post("/registerpage", registerpage_cont);
router.get("/addproduct", auth, addproduct);
router.get("/view_product", auth, viewproduct);
router.get("/update/:email", auth, update);
router.post("/updatepage", auth, update_cont);
router.get("/dashboard", auth, dashboard);
router.get("/otp_genrate", auth, otp);
router.post("/delete", auth, delete_cont);
router.post("/block_user", auth, block_cont);
router.post("/email_ver", auth, email_cont);
router.post("/otp_ver", auth, otpver_cont);
router.get("/addamount", auth, addamt_cont);
router.post("/addamt", auth, addamt);
router.get("/withamount", auth, widamt_cont);
router.post("/widamt", auth, widamt);
router.post("/search", auth, search_cont);
router.get("/viewtransaction", auth, transaction_cont);
router.get("/signout", auth, signout);

module.exports = router;
