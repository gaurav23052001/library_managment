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
    message: "subadmin register successfully",
  };
};