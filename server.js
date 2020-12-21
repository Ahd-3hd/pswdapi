require("dotenv").config();
const express = require("express");
const userRouter = require("./api/routes/user.routes");
const entityRouter = require("./api/routes/entity.routes");
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();
app.use(express.json());
app.use("/auth", userRouter);
app.use("/entities", entityRouter);

app.listen(3000, () => console.log(`listening at port 3000`));
