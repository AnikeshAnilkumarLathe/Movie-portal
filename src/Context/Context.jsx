import React, { useContext, useEffect, useState } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [Load, setLoad] = useState(true);
  const [movie, setMovie] = useState([]);
  const [results, setResults] = useState("");

  const BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      setLoad(true);
      try {
        let endpoint = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
        if (results) {
          endpoint = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(results)}`;
        }

        const res = await fetch(endpoint);
        const data = await res.json();
        console.log(data)
        setMovie(data.results || []);
      } catch (error) {
        console.error("Error fetching movies", error);
      } finally {
        setLoad(false);
      }
    };

    const delay = setTimeout(() => {
      fetchMovies();
    }, 1000);

    return () => clearTimeout(delay);
  }, [results]);

  return (
    <AppContext.Provider value={{ movie, Load, setLoad, results, setResults }}>
      {children}
    </AppContext.Provider>
  );
};

const universalContext = () => {
  return useContext(AppContext)
};

export { AppContext, AppProvider, universalContext };
