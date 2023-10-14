const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./routes/user");
const qnaRoute = require("./routes/qna");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/qna", qnaRoute);
app.use(express.json());
app.listen(8000, () => console.log('Running on port 8000'));