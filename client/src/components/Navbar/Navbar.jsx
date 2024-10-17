// src/components/Navbar/Navbar.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";

function Navbar({ userInfo = null }) {
  const [searchCategory, setSearchCategory] = useState("");

  const navigate = useNavigate();

  const handleSearch = (value) => {
    setSearchCategory(value);
    if (value.trim() === "") {
      navigate("/"); // Redirect to home when input is empty
    } else {
      navigate(`/search/${value}`);
    }
  };

  const onClearSearch = () => {
    setSearchCategory(""); 
    navigate("/"); // Ensure navigation to the home page
  };

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 px-4 lg:px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <h2 className="text-2xl font-bold text-white">Dog's House</h2>

        <div className="flex items-center lg:order-2 gap-4">
          <SearchBar
            value={searchCategory}
            onChange={({ target }) => handleSearch(target.value)}
            onClearSearch={onClearSearch}
            className="bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 rounded-lg px-3 py-2"
          />

          <ProfileInfo
            userInfo={userInfo}
            onLogout={onLogout}
            className="text-white"
          />
        </div>

        <div
          className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 text-gray-300">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-600 hover:text-white"
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/lists"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-600 hover:text-white"
                  }`
                }
              >
                Your Lists
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
