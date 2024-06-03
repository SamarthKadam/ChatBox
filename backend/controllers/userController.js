const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const Chat = require("../models/chatModel");
const multer = require("multer");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "../config.env") });

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWTSECRET, {
    expiresIn: process.env.JWTEXPIRES,
  });
  return token;
};

const multerstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/user");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${req.user._id}-${Date.now()}.${ext}`);
  },
});

const multerfilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError(`Please upload images only`, 400), false);
  }
};

const upload = multer({
  storage: multerstorage,
  fileFilter: multerfilter,
});

exports.uploadUserPhoto = upload.single("photo");
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

  res.status(200).json({
    status: "success",
    users,
  });
});

exports.UpdateMe = catchAsync(async (req, res, next) => {
  if (!req.body.name || !req.body.email)
    next(new AppError("Empty fields are not allowed", 400));

  const filteredBody = filterObj(req.body, "name", "email");
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    updatedUser,
  });
});

exports.UploadPhoto = catchAsync(async (req, res, next) => {
  let data;
  if (req.file) data = req.file.filename;
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { pic: data },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

// exports.AvailableUsersToCreateGroup=catchAsync(async(req,res)=>{

// })

//making SENDCODE method for sending the CODE to the user EMAIL
exports.sendCode = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new AppError("Please provide email", 400));
  }
  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("User not found . Create one", 400));
  }

  try {
    //sending the opt to the email
    const number = Math.floor(Math.random() * 900000) + 100000;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.mail_id,
        pass: process.env.pass_id,
      },
    });
    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "CHATBOX",
        link: "https://mailgen.js",
      },
    });
    let response = {
      body: {
        name: "",
        intro: "Welcome to CHATBOX! We're very excited to have you on board.",
        action: {
          instructions: "Your OTP for CHATBOX is",
          button: {
            color: "#22BC66",
            text: number,
            link: "",
          },
        },
        outro: "Thankyou for a part of CHATBOX",
      },
    };
    let mail = MailGenerator.generate(response);
    let message = {
      to: email,
      subject: "Chatbox Support team",
      html: mail,
    };
    transporter
      .sendMail(message)
      .then(() => {
        res.status(200).json({ status: "success", otp: number });
      })
      .catch((error) => {
        console.log("Email is not send", error);
      });
  } catch (error) {
    console.log("code send function", error);
    return next(new AppError("User not found . Create one", 400));
  }
});

//updating the PASSWORD in data base
exports.updatePassword = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("User not found.", 400));
  }

  const newPassword = await bcrypt.hash(password, 12);

  const updateUser = await User.findOneAndUpdate(
    { email },
    { password: newPassword }
  );

  const token = signToken(updateUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: updateUser,
  });
});
