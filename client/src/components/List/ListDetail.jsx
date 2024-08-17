import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ListDetail({ isEditMode }) {
  const { listName } = useParams();
  const [images, setImages] = useState([]);
  const [currentListName, setCurrentListName] = useState(listName);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLists = JSON.parse(localStorage.getItem("savedLists")) || [];
    const list = savedLists.find((list) => list.name === listName);
    if (list) {
      setImages(list.images);
    }
  }, [listName]);

  const handleRemoveImage = (code) => {
    const updatedImages = images.filter((image) => image.code !== code);
    setImages(updatedImages);

    const savedLists = JSON.parse(localStorage.getItem("savedLists")) || [];
    const updatedLists = savedLists.map((list) =>
      list.name === listName ? { ...list, images: updatedImages } : list
    );
    localStorage.setItem("savedLists", JSON.stringify(updatedLists));
  };

  const handleSaveListName = () => {
    const savedLists = JSON.parse(localStorage.getItem("savedLists")) || [];
    const updatedLists = savedLists.map((list) =>
      list.name === listName ? { ...list, name: currentListName } : list
    );
    localStorage.setItem("savedLists", JSON.stringify(updatedLists));
    navigate(`/list/${currentListName}`);
  };

  return (
    <div className="relative flex flex-wrap items-center py-12 px-32 gap-8 bg-gradient-to-r from-blue-600 to-purple-600 min-h-screen">
      {isEditMode ? (
        <input
          type="text"
          value={currentListName}
          onChange={(e) => setCurrentListName(e.target.value)}
          className="w-full text-2xl font-bold mb-4 bg-white text-gray-800 p-3 rounded shadow-md"
        />
      ) : (
        <h2 className="w-full text-2xl font-bold mb-4 text-white">
          {listName}
        </h2>
      )}

      {images.length > 0 ? (
        images.map(({ src, code }) => (
          <div key={code} className="relative flex flex-col items-center">
            <img
              className="w-72 mt-4 rounded shadow-lg border-4 border-white"
              src={src}
              alt={`HTTP Dog ${code}`}
            />
            {isEditMode && (
              <button
                className="mt-2 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500 transition duration-200"
                onClick={() => handleRemoveImage(code)}
              >
                Remove
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="mt-4 text-white">No images found in this list.</p>
      )}

      {isEditMode && (
        <button
          className="absolute top-2 right-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 transition duration-200"
          onClick={handleSaveListName}
        >
          Save List Name
        </button>
      )}
      <button
        className="absolute top-2 left-2 bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        onClick={() => navigate("/lists")}
      >
        Back to Lists
      </button>
    </div>
  );
}

export default ListDetail;
