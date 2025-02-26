import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <div className="flex justify-center mt-6 w-full max-w-md">
      <input
        type="text"
        placeholder="Enter City Name"
        className="border-2 bg-white border-blue-300 rounded-l-full px-4 py-2 w-full focus:outline-none focus:border-blue-500"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-full transition duration-300 ease-in-out flex items-center"
        onClick={handleSearch}
      >
        <Search className="mr-1" size={20} />
        Search
      </button>
    </div>
  );
};

export default SearchBar;
