const express = require("express");
const EntityController = require("../controllers/entity.controllers");
const authenticate = require("../middlewares/auth.middleware");

const entityRouter = express.Router();

entityRouter.get("/", authenticate, EntityController.getAllEntities);
entityRouter.post("/", authenticate, EntityController.createEntity);

module.exports = entityRouter;
