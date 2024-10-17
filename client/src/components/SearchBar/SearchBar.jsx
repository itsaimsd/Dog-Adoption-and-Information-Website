// src/components/SearchBar/SearchBar.jsx
import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, onClearSearch }) => {
  return (
    <div className="w-80 flex items-center px-4 bg-gray-700 rounded-md">
      <input
        type="text"
        placeholder="Search Code"
        className="w-full text-sm bg-transparent py-[11px] outline-none text-white"
        value={value}
        onChange={onChange}
      />

      {value && (
        <IoMdClose
          className="text-xl text-gray-300 cursor-pointer hover:text-white mr-3"
          onClick={onClearSearch}
        />
      )}

      <FaMagnifyingGlass className="text-gray-400 cursor-pointer hover:text-white" />
    </div>
  );
};

export default SearchBar;
