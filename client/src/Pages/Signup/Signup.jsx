// src/Pages/Signup/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput"; // Ensure this path is correct
import { validateEmail } from "../../Utils/Helper";
import axiosInstance from "../../Utils/AxiosInstance";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!name) {
      setError("Please enter your name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError(""); // Clear any previous errors

    try {
      // Send the signup request to the server
      const response = await axiosInstance.post("/create_account", {
        fullname: name, // Ensure the key matches what the server expects
        email: email,
        password: password,
      });

      // Handle successful registration response
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/"); // Redirect to home on successful signup
      } else {
        setError(
          response.data.message ||
            "An unexpected error occurred. Please try again."
        );
      }
    } catch (error) {
      // Log the error response for debugging
      console.error("Error during signup:", error);
      if (error.response && error.response.data) {
        setError(
          error.response.data.message ||
            "An unexpected error occurred. Please try again."
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="flex flex-col rounded-2xl shadow-2xl shadow-black w-1/3 p-8 bg-gray-800">
        <h1 className="text-2xl font-bold text-white text-center mb-4">
          Sign Up
        </h1>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSignup}>
          <label className="text-left font-serif text-white">Name</label>
          <input
            type="text"
            placeholder="Name"
            className="p-3 font-serif text-black border border-gray-600 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="text-left font-serif text-white">Email</label>
          <input
            type="text"
            placeholder="abc@gmail.com"
            className="p-3 font-serif text-black border border-gray-600 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="text-left font-serif text-white">
            Create Password
          </label>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 pb-1 text-md">{error}</p>}
          <button
            type="submit"
            className="bg-blue-600 p-3 rounded-lg text-white active:bg-blue-700 hover:bg-blue-500 transition duration-200"
          >
            Create Account
          </button>
          <p className="text-white">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
