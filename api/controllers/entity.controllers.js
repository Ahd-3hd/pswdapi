const Entity = require("../models/entity.model");

exports.getAllEntities = async function (req, res) {
  const user = req.user;
  if (user) {
    return res.status(200).json(user);
  }
};
