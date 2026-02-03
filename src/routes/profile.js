const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const { Users } = require("../models/user");

profileRouter.post("/profile/view", userAuth, async (req, res) => {
  try {
    const userData = req.user;
    res.send(userData);
  } catch (err) {
    res.status(401).send("Error: " + err);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    // if (!validateEditProfileData(req)) {
    //   throw new Error("Invalid Edit Request");
    // }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    // const user = await Users.findByIdAndUpdate(loggedInUser._id, req.body, {
    //   returnOriginal: false,
    // });

    loggedInUser.save();

    res.json({
      message: `✅ ${loggedInUser.firstName} Your details have been unpdated.`,
      data: loggedInUser
    });
  } catch (err) {
    res.status(401).send("Error: " + err);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  
})

module.exports = profileRouter;
