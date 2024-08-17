import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Lists() {
  const [savedLists, setSavedLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const lists = JSON.parse(localStorage.getItem("savedLists")) || [];
    setSavedLists(lists);
  }, []);

  const handleDeleteList = (listName) => {
    const updatedLists = savedLists.filter((list) => list.name !== listName);
    localStorage.setItem("savedLists", JSON.stringify(updatedLists));
    setSavedLists(updatedLists);
  };

  return (
    <div className="flex flex-col items-start py-12 px-32 gap-8 bg-gray-900 min-h-screen">
      {savedLists.length > 0 ? (
        savedLists.map(({ name }, index) => (
          <div key={index} className="flex flex-col w-48 shadow-lg">
            <button
              onClick={() => navigate(`/list/${name}`)}
              className="bg-blue-700 p-2 text-white font-semibold rounded-t-lg hover:bg-blue-600 transition duration-200"
            >
              {name}
            </button>
            <div className="flex flex-row">
              <button
                className="w-1/3 cursor-pointer bg-blue-500 text-white p-2 rounded-bl-lg hover:bg-blue-400 transition duration-200"
                onClick={() => navigate(`/list/${name}`)}
              >
                Show
              </button>
              <button
                className="w-1/3 cursor-pointer bg-yellow-500 text-white p-2 hover:bg-yellow-400 transition duration-200"
                onClick={() => navigate(`/edit/${name}`)}
              >
                Edit
              </button>
              <button
                className="w-1/3 cursor-pointer bg-red-500 text-white p-2 rounded-br-lg hover:bg-red-400 transition duration-200"
                onClick={() => handleDeleteList(name)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="mt-4 text-white">No saved lists.</p>
      )}
    </div>
  );
}

export default Lists;
