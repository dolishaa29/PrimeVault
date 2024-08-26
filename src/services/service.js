const admin = require("../model/user");
const transaction = require("../model/transaction");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
exports.login_ser = async (req, res) => {
  var email = req.body.email;
  var pass = req.body.pass;

  let data = await admin.findOne({ email: email, pass: pass });
  let uid = data?.user_id;

  if (data) {
    if (data.active == true) {
      let balance = data.amount;
      let token = jwt.sign({ _id: data._id }, "aabbcc");
      res.cookie("jwt", token);
      res.cookie("s1", email);
      res.cookie("s3", uid);

      res.render("dashboard", { message: email, balance });
    } else {
      console.log("User is blocked");
    }
  } else {
    console.log("Login failed");
  }
};

exports.registerpage_ser = async (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let mobile = req.body.mobile;
  let pass = req.body.pass;
  let data = await admin.findOne({ email: email });
  if (data) {
    res.send("user already exists");
  } else {
    let user = await new admin({
      name,
      email,
      mobile,
      pass,
      user_id: 1,
      parent_id: "",
      active: true,
    });
    await user.save();
    res.render("adminlogin");
  }
};
exports.adduser_ser = async (req, res) => {
  let balance = req.user.amount;
  const id = req.user.email;
  const name = req.body.name;
  const dateOfBirth = req.body.dateOfBirth;
  const state = req.body.state;
  const pass = req.body.pass;
  const city = req.body.city;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const address = req.body.address;
  const gender = req.body.gender;
  const amount = req.body.amount;
  const userid = req.cookies.s3;
  const users = await admin.find();
  let cid = 1;
  users.forEach((v) => {
    if (v.user_id > cid) cid = v.user_id;
  });
  let uid = cid + 1;
  const data = await admin.findOne({ email });

  let adminAmt = amount * 0.25;
  let newAmt = amount * 0.75;
  if (data) {
    res.send("user already exists");
  } else {
    const user = await new admin({
      name,
      dateOfBirth,
      state,
      pass,
      city,
      email,
      mobile,
      address,
      gender,
      amount: newAmt,
      parent_id: userid,
      user_id: uid,
      active: false,
    });
    await user.save();
    let commission = await admin.findOneAndUpdate(
      { email: id },
      { $inc: { amount: adminAmt } }
    );

    const transactions = await new transaction({
      name: name,
      email: commission.email,
      amount: adminAmt,
      type: "commission",
      date: new Date(),
    });

    await transactions.save();

    res.render("dashboard", { message: id, balance  }); // Pass balance here
  }
};

exports.viewuser_ser = async (req, res) => {
  const balance = req.user.amount;
  let uid = req.cookies.s3;
  let data = await admin.find({ parent_id: uid });

  res.render("viewuser", { data, balance });
};
exports.adminprofile_ser = async (req, res) => {
  let email = req.user.email;
  let data = await admin.findOne({ email: email });

  if (data) {
    res.render("adminprofile", { data, balance: data.amount });
  } else {
    console.log("data not found");
  }
};
exports.updateprofile_ser = async (req, res) => {
  let email = req.cookies.s1;
  let name = req.body.name;
  let phone = req.body.mobile;

  let result = await admin.findOneAndUpdate(
    { email: email },
    { name: name, mobile: phone }
  );
  res.send("updated");
};
exports.changepass_ser = async (req, res) => {
  let email = req.cookies.s1;
  let oldpass = req.body.oldpass;
  let pass = req.body.pass;
  let conpass = req.body.conpass;

  let Op = await admin.findOne({ email: email, pass: oldpass });
  if (Op) {
    if (pass == conpass) {
      await admin.findOneAndUpdate({ email: email }, { pass: pass });
    } else {
      res.send("new and old password not matched");
    }
  } else {
    res.send("wrong old pass");
  }
};
exports.update = async (req, res) => {
  let data = req.params.email;
  res.clearCookie("update");
  res.cookie("update", data);
  res.render("update");
};
exports.update_ser = async (req, res) => {
  let name = req.body.name;
  let pass = req.body.pass;
  let mobile = req.body.mobile;
  let email = req.cookies.update;

  let data = await admin.findOneAndUpdate({ email }, { name, pass, mobile });
  if (data) res.send("data updated");
};
exports.delete_ser = async (req, res) => {
  let id = req.user.email;
  let email = req.body.email;
  let data = await admin.deleteOne({ email: email });
  if (data) {
    console.log("deleted");
    res.send("data deleted");
  } else {
    console.log("not found");
  }
};
exports.block_ser = async (req, res) => {
  let email = req.body.email;
  let but = req.body.but;
  if (but == "Unblock") {
    let data = await admin.findOneAndUpdate({ email: email }, { active: true });
    if (data) {
      console.log("User Unblocked");
    } else {
      console.log("User Not found");
    }
  } else {
    let data = await admin.findOneAndUpdate(
      { email: email },
      { active: false }
    );
    if (data) {
      console.log("User Blocked");
    } else {
      console.log("User Not found");
    }
  }
};
exports.email_ser = async (req, res) => {
  let mail = req.body.email;

  console.log(mail);

  generateOTP = () => {
    const digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };

  const otp = generateOTP();

  async function email() {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "primevault.11@gmail.com",
        pass: "bltw jlbm fmuv abjk",
      },
    });

    const mailOptions = {
      from: "primevault.11@gmail.com",
      to: `${mail}`,
      subject: "Your OTP for Gmail Verification",
      text: `Your OTP is :${otp}`,
    };

    // Create a new field named 'otp' in the MongoDB document
    await admin.findOneAndUpdate({ email: mail }, { otp: otp });

    await transporter.sendMail(mailOptions);
  }

  res.cookie("email", mail);
  await email();
  console.log("OTP send to user");
  res.render("otpver");
};
exports.otpver_ser = async (req, res) => {
  const email = req.user.email;
  const otp = req.body.otp;
  let userRec = await admin.findOne({ email, otp });

  if (userRec) {
    res.render("dashboard", { message: email, balance: userRec.amount });
    console.log("OTP Matched");
  } else {
    res.send("otp not matched");
    console.log("OTP not matched");
  }
};
exports.transaction_ser = async (req, res) => {
  const email = req.user.email;
  const balance = req.user.amount;
  const data = await admin.find({ email: email });
  const transactions = await transaction.find();
  if (data) {
    res.render("transaction", { transaction: transactions, balance });
  }
};

exports.addamt_ser = async (req, res) => {
  const email = req.user.email;
  const amount = parseInt(req.body.amount);
  const data = await admin.findOneAndUpdate(
    { email: email },
    { $inc: { amount } }
  );
  const user = await new transaction({
    name: req.user.name,
    email,
    amount,
    type: "Credit",
    date: new Date(),
  });
  await user.save();
  console.log("amount added");
  res.render("dashboard", { message: email, balance: data.amount });
};
exports.widamt_ser = async (req, res) => {
  const email = req.user.email;
  const amount = parseInt(req.body.amount);

  const user = await admin.findOne({ email: email });

  if (!user || user.amount < amount || user.amount <= 0) {
    res.send("Balance not available");
  } else {
    const updatedUser = await admin.findOneAndUpdate(
      { email: email },
      { $inc: { amount: -amount } }
    );

    const transactions = await new transaction({
      // Use the imported transaction model
      name: updatedUser.name,
      email: updatedUser.email,
      amount: amount,
      type: "Debit",
      date: new Date(),
    });

    await transactions.save();

    console.log("Amount withdrawn");

    res.render("dashboard", { message: email, balance: user.amount });
  }
};
exports.search_ser = async (req, res) => {
  let but = req.body.but;
  let search = req.body.search;
  let balance=req.user.amount;
  if (but == "Email") {
    let transactions = await transaction.find({ email:search});
    res.render("transaction",{transaction:transactions,balance})
  } else if (but == "Name") {
    let transactions = await transaction.find({ name:search});
    res.render("transaction",{transaction:transactions,balance})
  } else if (but == "Amount") {
    let amt =parseInt(search);
    let transactions = await transaction.find({ amount:amt});
    res.render("transaction",{transaction:transactions,balance})
  }
};
exports.signout_ser = async (req, res) => {
  let token=req.cookies.jwt;
  res.cookie("jwt","");
  res.redirect("/");
};