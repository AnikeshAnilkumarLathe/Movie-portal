import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

function MovieInfo() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <div className="text-center mt-10 text-white bg-black min-h-screen">Loading...</div>;
  if (!movie || movie.success === false)
    return <p className="text-center mt-10">Movie not found</p>;

  return (
    <div className="bg-gray-800 min-h-screen text-white">
      <div
        className="relative w-full h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>

        <Link
          to="/"
          className="absolute top-4 left-4 bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400"
        >
          ← Back
        </Link>

        <div className="absolute bottom-4 left-6 flex items-end gap-6">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-40 md:w-56 rounded-lg shadow-lg"
          />
          <div>
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <p className="text-gray-300 italic">{movie.tagline}</p>
            <p className="mt-2 text-sm text-gray-400">
              ⭐ {movie.vote_average} / 10 • {movie.release_date} •{" "}
              {movie.runtime} min
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="text-gray-300 leading-relaxed">{movie.overview}</p>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Genres</h3>
          <div className="flex gap-2 flex-wrap">
            {movie.genres?.map((g) => (
              <span
                key={g.id}
                className="px-3 py-1 bg-yellow-500 text-black rounded-full text-sm font-medium"
              >
                {g.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
