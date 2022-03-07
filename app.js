const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const todoRoute = require("./routes/todo");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//Cors meddleware
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// app.use(express.json());
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("My todo server is running");
});
//Todo route
app.use("/api", todoRoute);
//connecting to database
mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    console.log("connected to db");
  })
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
