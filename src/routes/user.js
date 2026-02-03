const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const Users = require("../models/user");
const userRouter = express.Router();

const USER_SAFE_DATA = [
  "firstName",
  "lastName",
  "photoUrl",
  "age",
  "gender",
  "about",
  "skills",
];
// Get all pending requests for the loggedIn user.
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    if (!connectionRequests.length) {
      res.json({
        message: "No request found",
      });
    }

    res.json({
      message: "Data fetched Successfully",
      data: connectionRequests,
      //   peopleData: connReqData,
    });
  } catch (err) {
    res.status(400).send("ssd");
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connections = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    }).populate("fromUserId", USER_SAFE_DATA);

    const filteredData = connections.map((conn) => conn.fromUserId);
    res.status(200).json({
      message: "Data fetched Successfully",
      data: filteredData,
    });
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
});
module.exports = userRouter;
