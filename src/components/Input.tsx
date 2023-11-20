import axios from "axios";
import sha256 from "crypto-js/sha256";
import { useEffect, useState } from "react";

const Input = () => {
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const publicAPI = process.env.REACT_APP_PUBLIC_API;
  const privateAPI = process.env.REACT_APP_PRIVATE_API;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (publicAPI && privateAPI) {
          const timestamp = Date.now();
          const message = timestamp + privateAPI + publicAPI;
          const hash = sha256(message);
          const url = `https://gateway.marvel.com/v1/public/characters?limit=100&apikey=${publicAPI}`;

          const response = await axios.get(url);
          // Extract names from response
          const names = response.data.data.results.map((character: any) => character.name);
          // Set the options
          setOptions(names);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [publicAPI, privateAPI]);

  const handleInputChange = (e: any) => {
    const inputValue = e.target.value;
    setSearch(inputValue);

    // Filter options based on input value
    const filteredSuggestions = options.filter((option: any) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  };

  // Set search value and empty suggestions
  const handleSuggestionClick = (suggestion: any) => {
    setSearch(suggestion);
    console.log(search);
    setSuggestions([]); 
  };

  return (
    <form>
      <input
        className="input"
        type="text"
        placeholder="Type your favorite marvel character"
        value={search}
        onChange={handleInputChange}
      />
      {suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)} className="list-elements">
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Input;
