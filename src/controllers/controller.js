const {
  login_ser,
  registerpage_ser,
  adduser_ser,
  viewuser_ser,
  adminprofile_ser,
  updateprofile_ser,
  changepass_ser,
  update,
  update_ser,
  delete_ser,
  block_ser,
  email_ser,
  otpver_ser,
  transaction_ser,
  widamt_ser,
  addamt_ser,
  search_ser,
  signout_ser,
} = require("../services/service");

exports.admin_cont = async (req, res) => {
  res.render("adminlogin");
};
exports.addusers_cont = async (req, res) => {
  const balance=req.user.amount;
  res.render("addusers",{balance});
};
exports.adduser_cont = async (req, res) => {
  adduser_ser(req, res);
};
exports.viewuser_cont = async (req, res) => {
  viewuser_ser(req, res);
};
exports.register_cont = async (req, res) => {
  res.render("register");
};
exports.login_cont = async (req, res) => {
  login_ser(req, res);
};
exports.registerpage_cont = async (req, res) => {
  registerpage_ser(req, res);
};
exports.adminprofile_cont = async (req, res) => {
  adminprofile_ser(req, res);
};
exports.updateprofile = async (req, res) => {
  updateprofile_ser(req, res);
};
exports.changepass = async (req, res) => {
  res.render("changepass");
};
exports.change_pass = async (req, res) => {
  changepass_ser(req, res);
};
exports.addproduct = async (req, res) => {
  res.render("");
};
exports.viewproduct = async (req, res) => {
  res.render("viewproduct");
};
exports.dashboard = async (req, res) => {
  const email=req.user.email;
  const balance=req.user.amount;
  res.render("dashboard", { message:email,balance});
};
exports.update = async (req, res) => {
  update(req, res);
};
exports.update_cont = async (req, res) => {
  update_ser(req, res);
};
exports.delete_cont = async (req, res) => {
  delete_ser(req, res);
};
exports.block_cont = async (req, res) => {
  block_ser(req, res);
};
exports.otp = async (req, res) => {
  res.render("otp");
};
exports.email_cont = async (req, res) => {
  email_ser(req, res);
};
exports.otpver_cont = async (req, res) => {
  otpver_ser(req, res);
};
exports.addamt_cont = async (req, res) => {
  res.render("addamount");
};
exports.addamt = async (req, res) => {
  addamt_ser(req, res);
};
exports.widamt_cont = async (req, res) => {
  res.render("withamount");
};
exports.widamt = async (req, res) => {
  widamt_ser(req, res);
};
exports.transaction_cont = async (req, res) => {
  transaction_ser(req, res);
};
exports.search_cont = async (req, res) => {
  search_ser(req, res);
};
exports.signout = async (req, res) => {
  signout_ser(req, res);
};
