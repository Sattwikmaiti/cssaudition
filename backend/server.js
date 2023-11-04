const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./routes/user");

dotenv.config();

mongoose
  .connect("mongodb+srv://maitisattwik:CGkjqvHGLjYa2qJe@cluster0.ekpzcce.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoute);


app.listen(8000, () => console.log('Running on port 8000'));