const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const Cart = require("../models/cartModel");
var nodemailer = require("nodemailer");
const Profile = require("../models/profileModel");

// const accountSid = "AC92215b8200a05164eb11679e579a6674";
// const authToken = "9e6bcf317888cd37175093e11b8e09d6";
// const client = require("twilio")(accountSid, authToken);

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "asadullah88889@gmail.com",
    pass: "rfszjkwllejurvnz",
  },
});
exports.admin = async (req, res) => {
  try {
    const p = await bcrypt.hash("adminadmin", 12);
    const user = await new User({
      username: "Admin",
      password: p,
      role: "admin",
      email: "admin@admin.com",
    });
    await user.save();
    return res.status(200).json({ message: "admin created successfully" });
  } catch (error) {
    console.log(error);
  }
};
exports.getallusers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
  }
};
exports.deleteuser = async (req, res) => {
  try {
    const users = await User.findOneAndDelete({ _id: req.params.id });
    return res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    console.log(error);
  }
};
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const fuser = await User.findOne({ email: email });
    if (fuser) {
      console.log(fuser);
      return res.status(400).json({
        success: false,
        message: "Email already registered please login to continue",
      });
    }
    if (!username) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter Username" });
    }
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter Email" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter Password" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Password must have 8 characters" });
    }
    const p = await bcrypt.hash(password, 12);
    const user = new User({ username, email, password: p });
    const cart = new Cart({ user: user });
    await cart.save();
    const profile = new Profile({ user: user });
    await profile.save();
    const userdata = await user.save();
    return res.status(200).json({
      success: true,
      message: "Account Created Successfully. Please Login To Continue",
    });
    // const userdataf = await user.save()
    // const otp = Math.random().toString(36).substring(2, 7);
    // const mail = await transporter.sendMail({
    //   to: user.email,
    //   from: "verify.com",
    //   subject: "email verification",
    //   html: `<p>Your otp code is ${otp}</p>`,
    // });
    // user.verifyemailtoken = otp;
    // if (mail) {
    //   return res.status(200).json({
    //     success: true,
    //     message:
    //       "Email has been sent to your email accout please verify to continue",
    //     user: userdata._id,
    //   });
    // } else {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Please Enter Valid Email" });
    // }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
exports.verifyuser = async (req, res) => {
  const { otp, id } = req.body;
  console.log(req.body);
  try {
    const fuser = await User.findOne({ _id: id });
    if (fuser.verifyemailtoken == otp) {
      console.log(fuser);
      const user = await User.findByIdAndUpdate(
        { _id: id },
        { isverifiedemail: true, verifyemailtoken: null },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "Register Success Please Login to Continue",
        user,
      });
    }

    return res
      .status(404)
      .json({ success: false, message: "Invalid Attempt!" });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter Email" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter Password" });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      const compare = await bcrypt.compare(password, user.password);
      if (compare) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        return res
          .status(200)
          .json({ success: true, message: "Login Success", data: user, token });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Invalid Crediantials" });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Email is no Register",
      });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
exports.loaduser = async (req, res) => {
  try {
    const user = req.user;
    const token = req.token;
    if (user) {
      return res.status(200).json({ success: true, data: user, token });
    }

    return res.status(400).json({ success: false, message: "Invalid Attempt" });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};
exports.sellerverify = async (req, res) => {
  try {
    const { phone } = req.body;
    const send = await client.messages.create({
      body: "This is the ship that made the Kessel Run in fourteen parsecs?",
      from: "+17579928430",
      to: phone,
    });

    return res.status(200).json({ success: true, send });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};
exports.passwordchange = async (req, res) => {
  try {
    const user = req.user;
    const { oldpassword, newpassword } = req.body;
    if (!oldpassword) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter Old Password" });
    }
    if (!newpassword) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter New Password" });
    }
    const check = await bcrypt.compare(oldpassword, user.password);
    if (check) {
      const p = await bcrypt.hash(newpassword, 12);
      const nuser = await User.findByIdAndUpdate(
        { _id: user._id },
        { password: p },
        { new: true }
      );
      return res
        .status(200)
        .json({ success: true, message: "Password Changed Successfully" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Passwords not match" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

exports.resetpasswordlink = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Email does not exists" });
    }
    const token = user._id + Math.random().toString(36).substring(2, 7);
    user.resettoken = token;
    await user.save();
    const mail = await transporter.sendMail({
      to: user.email,
      from: "no-replay@insta.com",
      subject: "password reset",
      html: `
            <p>You requested for password reset</p>
            <h5>click in this <a href="http://localhost:3000/passwordreset/${token}">Change Password</a> to reset password</h5>
            `,
    });
    if (mail) {
      return res.status(200).json({
        success: true,
        message: "Please Check your email to reset your password",
      });
    }
    return res.status(400).json({
      success: false,
      message: "Something went wrong please try again",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

exports.resetpassword = async (req, res) => {};
function random(len) {
  let result = Math.floor(Math.random() * Math.pow(10, len));

  return result.toString().length < len ? random(len) : result;
}
exports.becomeaseller = async (req, res) => {
  try {
    const user = req.user;

    const email = req.user.email;
    console.log(email);
    if (email) {
      let user_ = await User.findByIdAndUpdate(
        { _id: req.user._id },
        { seller_request: true },
        { new: true }
      );
      return res.status(200).json({ user: user_ });
    }
    return res.status(400).json({ message: "somethng went wrong" });
    // const key = random(5);

    // user.verifyemailtoken = key;
    // await user.save();
    // const mail = await transporter.sendMail({
    //   to: email,
    //   from: "no-replay@insta.com",
    //   subject: "Seller Varification",
    //   html: `
    //         <p>yout email otp is ${key}</p>
    //         `,
    // });
    // if (mail) {
    //   return res.status(200).json({
    //     success: true,
    //     message: "Otp has been sent to your email",
    //   });
    // }
  } catch (error) {
    console.log(error);
  }
};

exports.emailverify = async (req, res) => {
  // const { otp } = req.body;
  // const user = req.user;
  try {
    const { id } = req.body;
    const user_ = await User.findByIdAndUpdate(
      { _id: id },
      { isverifiedemail: true, role: "seller", verifyemailtoken: "" },
      { new: true }
    );
    // if (!otp) {
    //   return res.status(400).json({ message: "Please Enter Otp" });
    // }
    // if (user.verifyemailtoken == otp) {
    //   const user_ = await User.findByIdAndUpdate(
    //     { _id: req.user.id },
    //     { isverifiedemail: true, role: "seller", verifyemailtoken: "" },
    //     { new: true }
    //   );
    //   return res.status(200).json({ message: "You are Seller Now", user_ });
    // }
    return res.status(200).json({ message: "Seller Approved", user: user_ });
  } catch (error) {
    console.log(error);
  }
};
