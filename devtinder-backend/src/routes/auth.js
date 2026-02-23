const express = require("express");
const authRouter = express.Router();
const Users = require("../models/user");

const bcrypt = require("bcrypt");
const { validateSignupData } = require("../utils/validation");

authRouter.post("/signup", async (req, res) => {
  try {
    // 1) Validate first
    validateSignupData(req);

    // 2) Extract only allowed fields (do NOT pass req.body directly)
    const { firstName, lastName, emailId, password } = req.body;

    // 3) Hash password
    const passwordHash = await bcrypt.hash(password, 10); // salt rounds = 10

    // 4) Save to DB (store hash, not plain password)
    const user = new Users({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save({ runValidators: true });
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Error: " + err);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ emailId: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    // const isPasswordHashed = await bcrypt.compare(password, user.password);
    const isPasswordHashed = await user.validatePassword(password);
    if (!isPasswordHashed) {
      throw new Error("Invalid Credentials");
    }

    const SECRET_KEY = "DevTinder@123";
    // const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "10s" });
    const token = await user.getJWT();
    res.cookie("token", token);
    res.send("Login Successful");
    // res.status(404).send("Invalid Credentials");
  } catch (err) {
    res.status(404).send("Error while login: " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  const token = await new Users().getJWT();

  res.cookie("token", token, { expires: new Date(Date.now()) });
  res.send("User Logged Out!!!!!!!");
});

module.exports = authRouter;
