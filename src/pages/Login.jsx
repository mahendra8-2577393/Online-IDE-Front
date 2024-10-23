import React, { useState } from "react";
import logo from "../images/logo3.png";
import { Link, useNavigate } from "react-router-dom";
import image from "../images/back.avif"; // Ensure the file exists in this exact 
import { api_base_url } from "../helper";
import { ToastContainer, toast } from "react-toastify"; // Import toast components
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: pwd,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userId", data.userId);

          // Show success toast
          toast.success("Login successful!");

          setTimeout(() => {
            window.location.href = "/";
          }, 2000); // Wait for 2 seconds before redirecting
        } else {
          setError(data.message);
          toast.error(data.message || "Login failed!");
        }
      })
      .catch((error) => {
        setError("An error occurred. Please try again.");
        toast.error("An error occurred. Please try again.");
      });
  };

  return (
    <>
      <div className="container w-screen min-h-screen mx-auto flex items-center justify-center relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
        ></div>

        {/* Dark Overlay for contrast (optional) */}
        <div className="absolute inset-0"></div>

        {/* Form Container */}
        <div className="relative z-10 w-[300px] lg:w-[50%] flex flex-col items-center justify-center py-12 bg-white rounded-3xl shadow-md">
          <img className="w-[300px] mb-4" src={logo} alt="Logo" />
          <form
            onSubmit={submitForm}
            className="w-[90%] flex flex-col items-center"
          >
            <div className="inputBox w-[250px] mb-4 rounded-xl">
              <input
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded-xl text-black"
              />
            </div>

            <div className="inputBox w-[250px] mb-4 rounded-xl">
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
              Don't have an account?{" "}
              <Link to="/signUp" className="text-[#00AEEF]">
                Sign Up
              </Link>
            </p>

            <p className="text-red-500 text-[14px]">{error}</p>

            <button className="btnBlue w-[250px] mt-[20px] rounded-3xl">
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Toast container for displaying the toast notifications */}
      <ToastContainer />
    </>
  );
};

export default Login;
