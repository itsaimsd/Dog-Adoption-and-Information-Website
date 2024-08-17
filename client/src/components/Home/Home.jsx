import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Home() {
  const [imageSrc, setImageSrc] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { searchTerm = "" } = useParams();
  const navigate = useNavigate();

  const defaultCodes = [
    100, 101, 102, 103, 200, 201, 202, 203, 204, 205, 206, 207, 208, 218, 226,
    300, 301, 302, 303, 304, 305, 306, 307, 308, 400, 401, 402, 403, 404, 405,
    406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420,
    421, 422, 423, 424, 425, 426, 428, 429, 430, 431, 440, 444, 449, 450, 451,
    460, 463, 464, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505,
    506, 507, 508, 509, 510, 511, 520, 521, 522, 523, 524, 525, 526, 527, 529,
    530, 561, 598, 599, 999,
  ];
  const searchCodes = [
    100, 101, 102, 103, 200, 201, 202, 203, 204, 205, 206, 207, 208, 218, 226,
    300, 301, 302, 303, 304, 305, 306, 307, 308, 400, 401, 402, 403, 404, 405,
    406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420,
    421, 422, 423, 424, 425, 426, 428, 429, 430, 431, 440, 444, 449, 450, 451,
    460, 463, 464, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505,
    506, 507, 508, 509, 510, 511, 520, 521, 522, 523, 524, 525, 526, 527, 529,
    530, 561, 598, 599, 999,
  ];

  const fetchImages = async (codes) => {
    const imagePromises = codes.map(async (code) => {
      try {
        const response = await fetch(`https://http.dog/${code}.jpg`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return { code, src: response.url };
      } catch (error) {
        console.error(`Error fetching image for code ${code}:`, error);
        return null;
      }
    });

    try {
      const results = await Promise.all(imagePromises);
      return results.filter((result) => result !== null);
    } catch (error) {
      console.error("Error fetching images:", error);
      return [];
    }
  };

  const handleClickOutside = useCallback((event) => {
    if (event.target.classList.contains("overlay")) {
      setSelectedImage(null);
    }
  }, []);

  const saveAllImages = () => {
    const savedLists = JSON.parse(localStorage.getItem("savedLists")) || [];
    const listName = `List${searchTerm ? ` ${searchTerm}` : ""}`;
    savedLists.push({ name: listName, images: imageSrc });
    localStorage.setItem("savedLists", JSON.stringify(savedLists));
    alert("successfully saved");
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const codesToFetch = searchTerm
        ? searchCodes.filter((code) => code.toString().startsWith(searchTerm))
        : defaultCodes;

      const images = await fetchImages(codesToFetch);
      setImageSrc(images);
      setLoading(false);
    };

    fetchData();
  }, [searchTerm]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  return (
    <div className="relative flex flex-wrap items-center py-12 px-32 gap-8">
      <button
        onClick={saveAllImages}
        className="absolute top-2 right-2 bg-orange-700 text-white px-4 py-2 rounded"
      >
        Save All
      </button>
      {loading ? (
        <p className="mt-4">Loading...</p>
      ) : error ? (
        <p className="mt-4">{error}</p>
      ) : imageSrc.length > 0 ? (
        imageSrc.map(({ src, code }) => (
          <div key={code} className="relative flex flex-col">
            <img
              className="w-72 mt-4 cursor-pointer"
              src={src}
              alt={`HTTP Dog ${code}`}
              onClick={() => setSelectedImage(src)}
            />
          </div>
        ))
      ) : (
        <p className="mt-4">No images found.</p>
      )}

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overlay bg-black bg-opacity-50">
          <img
            className="max-w-full max-h-full z-60"
            src={selectedImage}
            alt="Selected"
          />
        </div>
      )}
    </div>
  );
}

export default Home;
