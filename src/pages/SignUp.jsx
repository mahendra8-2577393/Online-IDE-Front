import React, { useState } from "react";
import logo from "../images/logo3.png";
import { Link, useNavigate } from "react-router-dom";
import image from "../images/authPageSide.png";
import { api_base_url } from "../helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader

    try {
      const response = await fetch(`${api_base_url}/signUp`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          name,
          email,
          password: pwd,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Account created successfully!");
        setTimeout(() => {
          setLoading(false); // Stop loader
          navigate("/login");
        }, 2000);
      } else {
        setError(data.message);
        toast.error(data.message || "Sign-up failed. Please try again.");
        setLoading(false); // Stop loader
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.");
      setLoading(false); // Stop loader
    }
  };

  return (
    <>
      <div className="container w-screen min-h-screen flex items-center justify-between px-[50px]">
        {/* Left Section: Logo and Form */}
        <div className="left w-[35%] flex flex-col items-center">
          <img className="w-[300px] mb-6" src={logo} alt="Logo" />
          <form onSubmit={submitForm} className="w-full mt-6 space-y-4">
            <div className="inputBox">
              <input
                required
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder="Username"
                className="w-full p-2 border border-gray-300 rounded-xl"
              />
            </div>
            <div className="inputBox">
              <input
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Name"
                className="w-full p-2 border border-gray-300 rounded-xl"
              />
            </div>
            <div className="inputBox">
              <input
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded-xl"
              />
            </div>
            <div className="inputBox">
              <input
                required
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                type="password"
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded-xl"
              />
            </div>
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
            <p className="text-red-500 text-sm">{error}</p>

            {/* Show loader or button based on loading state */}
            <button
              type="submit"
              className="btnBlue w-full py-2 bg-blue-600 text-white rounded-3xl hover:bg-blue-700 transition duration-300 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <span className="loader" />
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>

        {/* Right Section: Background Image */}
        <div className="right w-[55%]">
          <img
            className="h-[100vh] w-full object-cover"
            src={image}
            alt="Auth Background"
          />
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </>
  );
};

export default SignUp;
