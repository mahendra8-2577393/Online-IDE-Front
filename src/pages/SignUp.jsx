import React, { useState } from "react";
import logo from "../images/logo3.png";
import { Link, useNavigate } from "react-router-dom";
import image from "../images/authPageSide.png";
import { api_base_url } from "../helper";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/signUp", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        name: name,
        email: email,
        password: pwd,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          alert("Account created successfully");
          navigate("/login");
        } else {
          setError(data.message);
        }
      });
  };

  return (
    <>
      <div className="container w-screen min-h-screen flex items-center justify-center relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
        ></div>

        {/* Dark Overlay for contrast (optional) */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Form Container */}
        <div className="relative z-10 w-[300px] lg:w-[35%] flex flex-col items-center lg:items-start justify-center py-12 px-6 bg-white bg-opacity-90 rounded-3xl shadow-md">
          <img
            className="w-[200px] sm:w-[250px] lg:w-[300px] mb-4"
            src={logo}
            alt="Logo"
          />
          <form onSubmit={submitForm} className="w-full mt-[30px]">
            <div className="inputBox mb-4">
              <input
                required
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder="Username"
                className="w-full p-2 border border-gray-300 rounded-xl"
              />
            </div>

            <div className="inputBox mb-4">
              <input
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Name"
                className="w-full p-2 border border-gray-300 rounded-xl"
              />
            </div>

            <div className="inputBox mb-4">
              <input
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded-xl"
              />
            </div>

            <div className="inputBox mb-4">
              <input
                required
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                type="password"
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded-xl"
              />
            </div>

            <p className="text-blue-900 font-extrabold mb-2">
              Already have an account?{" "}
              <Link to="/login" className="text-[#00AEEF]">
                Login
              </Link>
            </p>

            <p className="text-red-500 text-[14px] my-2">{error}</p>

            <button className="btnBlue w-full mt-[20px] rounded-3xl">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
