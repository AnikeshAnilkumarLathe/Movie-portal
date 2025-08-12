import React from "react";
import { universalContext } from "../Context/Context";
import { NavLink } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";

function Home() {
  const { movie, Load } = universalContext();

  if (Load) {
    return <p className="text-center text-lg mt-10">Loading...</p>;
  }

  return (
    <div className="px-6 py-10 bg-gray-800">
      <SearchBar/>
      <h2 className="text-4xl font-bold text-center mb-8 text-yellow-500">Popular Movies</h2>
      <div className="grid gap-y-6 gap-x-1 justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movie.map((m) => (
          <NavLink key={m.id} to={`movie/${m.id}`}>
          <div
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition-transform duration-200 w-56 mx-auto"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
              alt={m.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-4">
              <h3 className="text-base font-semibold truncate">{m.title}</h3>
              <p className="text-sm text-gray-500">
                Release: {m.release_date}
              </p>
              <p className="text-sm font-medium mt-1">⭐ {m.vote_average}</p>
            </div>
          </div>
           </NavLink>
        ))}
       
      </div>
    </div>
  );
}

export default Home;
