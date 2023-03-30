const bcrypt = require("bcryptjs");
const common = require("../utils/common");
const User = require("../models/user");

exports.createUser = async (req) => {
  const spassword = await bcrypt.hash(req.body.password, 12);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: spassword,
    address: req.body.address,
  });
  await user.save();
  return {
    message: "User register successfully",
  }
};

exports.loginUser = async (email, password) => {
  const user = await common.findByCredentials(email, password);
  if (user.role == "user") {
    const token = await common.generateAuthToken(user._id);

    return {
      message: "User login successfully",
      data: user,
      token,
    };
  }
  const token1 = await common.generateAuthTokenAdmin(user._id);
  return {
    message: "User login successfully",
    data: user,
    token1,
  };
};
