import axios from "axios";
import sha256 from "crypto-js/sha256";
import { useEffect, useState } from "react";

const Input = () => {
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const publicAPI = process.env.REACT_APP_PUBLIC_API;
  const privateAPI = process.env.REACT_APP_PRIVATE_API;




  useEffect(() => {
    const fetchData = async () => {
      try {
        if (publicAPI && privateAPI) {
          const timestamp = Date.now();
          const message = timestamp + privateAPI + publicAPI;
          const hash = sha256(message);
          // const url = `http://gateway.marvel.com/v1/public/characters?ts=${timestamp}&hash=${hash}&apikey=${privateAPI}`;  
          const url = `https://gateway.marvel.com/v1/public/characters?apikey=${publicAPI}`;  
          console.log(url);
          const response = await axios.get(url);
          // Update state based on the response
          // setOptions(response.data.results);
          console.log(response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [publicAPI, privateAPI]); 

  return (
    <form>
      <input
        className="input"
        type="text"
        placeholder="Type your favorite marvel character"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Input;
