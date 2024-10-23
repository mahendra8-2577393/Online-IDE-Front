import React, { useEffect, useState } from "react";
import logo from "../images/logo3.png";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { MdLightMode } from "react-icons/md";
import { BsGridFill } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa"; // Import Hamburger and Cross Icons
import { api_base_url, toggleClass } from "../helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar"; // Import Sidebar component

const Navbar = ({ isGridLayout, setIsGridLayout }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
      return;
    }

    fetch(api_base_url + "/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.user);
        } else {
          setError(data.message);
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch user details");
      });
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
    toast.success("Logout Successfully");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <>
      <div className="navbar flex items-center justify-between px-4 md:px-[100px] h-[80px] bg-[#141414]">
        <div className="logo flex items-center">
          <Link to="/">
            <img
              className="w-[250px] md:w-[300px] cursor-pointer"
              src={logo}
              alt="Logo"
            />
          </Link>
          {/* Conditional Rendering of Hamburger or Cross Menu */}
          {/* {isSidebarOpen ? (
            <FaTimes
              className="text-white text-2xl ml-4 cursor-pointer block md:hidden"
              onClick={toggleSidebar} // Cross icon to close sidebar
            />
          ) : (
            <FaBars
              className="text-white text-2xl ml-4 cursor-pointer block md:hidden"
              onClick={toggleSidebar} // Hamburger icon to open sidebar
            />
          )} */}
        </div>

        {/* Navigation links - hidden on screens below 500px */}
        <ul className="hidden md:flex gap-4">
          <li>
            <Link to="/" className="text-white p-4 block">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white p-4 block">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-white p-4 block">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/services" className="text-white p-4 block">
              Services
            </Link>
          </li>
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={logout}
            className="btnBlue bg-blue-500 min-w-[120px] ml-2 hover:!bg-red-600"
          >
            Logout
          </button>
          <Avatar
            onClick={() => {
              toggleClass(".dropDownNavbar", "hidden");
            }}
            name={data ? data.name : ""}
            size="40"
            round="50%"
            className="cursor-pointer ml-2"
          />
        </div>
        {isSidebarOpen ? (
            <FaTimes
              className="text-white text-2xl ml-4 cursor-pointer block md:hidden"
              onClick={toggleSidebar} // Cross icon to close sidebar
            />
          ) : (
            <FaBars
              className="text-white text-2xl ml-4 cursor-pointer block md:hidden"
              onClick={toggleSidebar} // Hamburger icon to open sidebar
            />
          )}

        <div className="dropDownNavbar hidden absolute right-[60px] top-[80px] shadow-lg shadow-black/50 p-[10px] rounded-lg bg-[#1A1919] w-[150px] h-[160px]">
          <div className="py-[10px] border-b-[1px] border-b-[#fff]">
            <h3 className="text-[17px]" style={{ lineHeight: 1 }}>
              {data ? data.name : ""}
            </h3>
          </div>
          <i
            className="flex items-center gap-2 mt-3 mb-2 cursor-pointer"
            style={{ fontStyle: "normal" }}
          >
            <MdLightMode className="text-[20px]" /> Light mode
          </i>
          <i
            onClick={() => setIsGridLayout(!isGridLayout)}
            className="flex items-center gap-2 mt-3 mb-2 cursor-pointer"
            style={{ fontStyle: "normal" }}
          >
            <BsGridFill className="text-[20px]" />{" "}
            {isGridLayout ? "List" : "Grid"} layout
          </i>
        </div>
      </div>

      {/* Sidebar component - toggled by hamburger/cross menu */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} logout={logout} />

      {/* Toast container for displaying the toast notifications */}
      <ToastContainer />
    </>
  );
};

export default Navbar;
