const Entity = require("../models/entity.model");

exports.getAllEntities = async function (req, res) {
  const user = req.user;
  const entities = await Entity.find({ email: user.email });
  return res.status(200).json(entities);
};

exports.createEntity = async function (req, res) {
  const user = req.user;
  const { title, account, password } = req.body;
  const entity = new Entity({
    email: user.email,
    title,
    account,
    password,
  });
  try {
    const newEntity = await entity.save();
    return res.status(201).json(newEntity);
  } catch (error) {
    return res.status(400).json({ message: "something went wrong" });
  }
};
