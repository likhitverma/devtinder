import React, { useState, } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("likhit.verma@gmail.com");
  const [password, setPassword] = useState("Likhit@12345");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.user));
      navigate("/feed")
      console.log(res.data.user);
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message,
      );
    }
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex justify-center items-center my-30">
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4 ">
        <h2 className="text-xl font-bold flex justify-center">Login</h2>
        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary mt-4" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
