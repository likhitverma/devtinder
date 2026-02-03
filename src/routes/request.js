const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
// const { validateEditProfileData } = require("../utils/validation");
const ConenctionRequest = require("../models/connectionRequest");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "invalid Status Type" });
      }

      if (fromUserId === toUserId) {
        return res
          .status(400)
          .json({ message: "Can't send request to the yourself" });
      }

      const existingConnectionRequest = await ConenctionRequest.findOne({
        $or: [
          {
            fromUserId,
            toUserId,
          },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection request already exists" });
      }
      const connectionRequest = new ConenctionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      res.json({
        message: "Connection Request Sent Successfully",
        data,
      });
    } catch (err) {
      res.status(401).send("Error: " + err);
    }
  },
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;
      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Status Not Allowed" });
      }

      let connectionRequest = await ConenctionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection Request Not Found" });
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();

      res.json({
        message: "Conenction Request " + status , data,
      });
    } catch (err) {
      res.status(401).send("Error: " + err);
    }
  },
);

module.exports = requestRouter;
