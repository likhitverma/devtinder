const express = require("express");
const jwt = require("jsonwebtoken");
const Users = require("../models/user")

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) throw new Error("Invalid Token");

    const decodedToken = jwt.verify(token, "DevTinder@123");
    const { id } = decodedToken;
    const user = await Users.findById(id);
    if (!user.id) throw new Error("Invalid User");

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send("Error: " + err.message);
  }
};

module.exports = { userAuth };
