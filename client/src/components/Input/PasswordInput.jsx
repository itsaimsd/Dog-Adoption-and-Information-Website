// src/components/Input/PasswordInput.jsx
import React from "react";

const PasswordInput = ({ value, onChange }) => {
  return (
    <input
      type="password"
      placeholder="Password"
      className="p-3 font-serif text-black border border-gray-600 rounded-lg"
      value={value}
      onChange={onChange}
    />
  );
};

export default PasswordInput;
