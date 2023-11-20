import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";

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
          const url = `https://gateway.marvel.com/v1/public/characters?limit=100&apikey=${publicAPI}`;
          const response = await axios.get(url);
          // Extract names from response
          const names = response.data.data.results.map(
            (character: any) => character.name
          );
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
    alert(suggestion);
    setSuggestions([]);
  };

  const onSubmit = (suggestion: any) => {
    alert(suggestion);
  };

  return (
    <>
      <form className="form-container">
        <div className="container">
          <div style={{ position: "relative" }}>
            <input
              className="input"
              type="text"
              placeholder="Type your favorite marvel character"
              value={search}
              onChange={handleInputChange}
            />
            {suggestions.length > 0 && (
              <ul
                className="suggestion-list"
                style={{ position: "absolute", top: "100%", left: 0 }}
              >
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="list-elements"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <button
          className="button"
          type="submit"
          onClick={() => onSubmit(search)}
        >
          Submit
        </button>
      </form>

      <Card name={search} />
    </>
  );
};

export default Input;