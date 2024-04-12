const express = require("express");
const app = express();
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./utils/errorController");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const chatRouter = require("./routes/chatRouter");
const messageRouter = require("./routes/messageRouter");
const downloadRouter = require("./routes/downloadRouter");


const allowedOrigins = ['http://localhost:3000','https://chat-box-samarthkadam.vercel.app'];
app.use(cors({
  origin:'*'
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public/img/user'));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/download", downloadRouter);

app.all("*", (req, res, next) => {
  next(new AppError("TypeError", 404));
});

app.use(globalErrorHandler);

module.exports = app;
