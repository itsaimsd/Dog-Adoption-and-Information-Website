import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../Utils/Helper";
import axiosInstance from "../../Utils/AxiosInstance";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter password");
      return;
    }
    setError("");

    // Login API CALL
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });
      // Handle successful signUp response
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/");
      }
    } catch (error) {
      // Handle signUp error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="flex flex-col rounded-2xl shadow-2xl shadow-black w-1/3 p-8 bg-gray-800">
        <h1 className="text-2xl font-bold text-white mb-4">Login</h1>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <label className="text-left font-serif text-white">Email</label>
          <input
            type="text"
            placeholder="Email"
            className="p-3 font-serif text-black border border-gray-600 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="text-left font-serif text-white">Password</label>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 pb-1 text-md">{error}</p>}
          <button
            type="submit"
            className="bg-blue-600 p-3 rounded-lg text-white active:bg-blue-700 hover:bg-blue-500 transition duration-200"
          >
            Login
          </button>
          <p className="text-white">
            Not registered yet?{" "}
            <Link
              to="/signup"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Create an Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
