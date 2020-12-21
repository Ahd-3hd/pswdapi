const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.signup = async function (req, res) {
  const { username, email, password } = req.body;

  if (username && email && password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = new User({
        username: username,
        password: hashedPassword,
        email: email,
      });
      await user.save();
      const accessToken = jwt.sign({ email, username }, process.env.JWT_SECRET);
      return res.json({
        username,
        email,
        accessToken,
      });
    } catch (error) {
      return res.status(500).json({ message: "something went wrong" });
    }
  }

  return res.status(400).json({ message: "check credentials" });
};

// TODO: this is bad; fix this logic
exports.signin = async function (req, res) {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      return res.status(200).json({
        username: user.username,
        email: user.email,
        token,
      });
    } catch (error) {
      return res.status(400).json({ message: "you need to login" });
    }
  }

  const { email, password } = req.body;
  if (email && password) {
    try {
      const user = await User.findOne({ email });
      const isSame = await bcrypt.compare(password, user.password);
      if (isSame) {
        const newToken = jwt.sign(
          { email, username: user.username },
          process.env.JWT_SECRET
        );
        return res.status(200).json({
          username: user.username,
          email,
          token: newToken,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "check credentials" });
    }
  }
};
