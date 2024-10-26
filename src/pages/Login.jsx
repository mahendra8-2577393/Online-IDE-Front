import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../images/logo3.png";
import image from "../images/authPageSide.png";
import { api_base_url } from "../helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${api_base_url}/login`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: pwd,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Set local storage
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userId", data.userId);

        toast.success("Logged in successfully!");

        // Use window.location.href for redirection
        setTimeout(() => {
          setLoading(false);
          window.location.href = "/"; // Redirect to home page
        }, 1000);
      } else {
        setError(data.message);
        toast.error(data.message || "Login failed. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container w-screen min-h-screen flex items-center justify-between pl-[100px]">
        <div className="left w-[35%]">
          <img className="w-[300px]" src={logo} alt="Logo" />

          <form onSubmit={submitForm} className="w-full mt-[60px] space-y-4">
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
              Don’t have an account?{" "}
              <Link to="/signUp" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>

            <p className="text-red-500 text-sm">{error}</p>

            <button
              type="submit"
              className="btnBlue w-full py-2 bg-blue-600 text-white rounded-3xl hover:bg-blue-700 transition duration-300 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <span className="loader"></span> // Replace with your loader implementation
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>

        <div className="right w-[55%]">
          <img
            className="h-[100vh] w-full object-cover"
            src={image}
            alt="Auth Background"
          />
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Login;
