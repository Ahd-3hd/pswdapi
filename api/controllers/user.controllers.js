const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.signup = async function (req, res) {
  const { username, email, password } = req.body;
  if (username && email && password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username: username,
      password: hashedPassword,
      email: email,
    });
    try {
      const newUser = await user.save();
      return res.json(newUser);
    } catch (error) {
      return res.status(500).json({ message: "something went wrong" });
    }
  } else {
    return res.status(400).json({ message: "check credentials" });
  }
};

exports.signin = async function (req, res) {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const user = await User.findOne({ email });
      const isSame = await bcrypt.compare(password, user.password);
      if (isSame) {
        const accessToken = jwt.sign(
          {
            username: user.username,
            email: user.email,
          },
          process.env.JWT_SECRET
        );
        return res.status(200).json({
          id: user._id,
          username: user.username,
          email: user.email,
          accessToken,
        });
      } else {
        return res.status(400).json({ message: "check your credentials" });
      }
    } catch (error) {
      return res.status(500).json({ message: "something went wrong" });
    }
  } else {
    return res.status(400).json({ message: "Check your credentials" });
  }
};
