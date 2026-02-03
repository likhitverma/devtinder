const express = require("express");
const { connectDB } = require("./src/config/database");
const Users = require("./src/models/user");
const ConnectionRequest = require("./src/models/connectionRequest");
const cookieParser = require("cookie-parser");

const {
  authRouter,
  profileRouter,
  requestRouter,
  userRouter,
} = require("./src/routes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter, profileRouter, requestRouter, userRouter);

connectDB()
  .then(() => {
    console.log("DB Connected Successfully");
    app.listen(7777, () => {
      console.log("Server Running at Port 7777");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/getAllUsers", async (req, res) => {
  try {
    const data = await Users.find({});
    res.send(data);
  } catch (err) {
    res.send(err.message);
  }
});

app.get("/getAllConnReq", async (req, res) => {
  try {
    const data = await ConnectionRequest.find({});
    res.send(data);
  } catch (err) {
    res.send(err.message);
  }
});

// app.get("/user/:id", async (req, res) => {
//   const data = await Users.findById(req.params.id);
//   res.send(data);
// });

// app.patch("/user/:id", async (req, res) => {
//   try {
//     const userData = req.body;
//     const ALLOWED_UPDATES = [
//       "photoUrl",
//       "about",
//       "gender",
//       "age",
//       "skills",
//       "password",
//     ];
//     const check = Object.keys(userData).every((field) =>
//       ALLOWED_UPDATES.includes(field),
//     );
//     if (check) {
//       const updatedUser = await Users.findByIdAndUpdate(
//         req.params.id,
//         userData,
//         {
//           returnOriginal: false,
//         },
//       );
//       res.json(updatedUser);
//     } else {
//       res
//         .status(400)
//         .send("You can updates these fields only: " + ALLOWED_UPDATES);
//     }
//   } catch (err) {}
// });

// app.put("/user/update/:id", async (req, res) => {
//   try {
//     const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
//       returnOriginal: false,
//       runValidators: true,
//     });
//     res.send(user);
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// });

// app.post("/addUser", async (req, res) => {
//   try {
//     const user = new Users(req.body);
//     const existingUser = await Users.find({ email: req.body.email });
//     if (existingUser.length) {
//       res.status(400).send("User Already Exists");
//     } else {
//       await user.save({ runValidators: true });
//       res.send("User Added Successfully");
//     }
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// });

// app.delete("/deleteAllUsers", async (req, res) => {
//   try {
//     const result = await Users.deleteMany({});
//     res.send(`Successfully deleted all ${result.deletedCount} documents.`);
//   } catch (err) {
//     res.send(err.message);
//   }
// });
