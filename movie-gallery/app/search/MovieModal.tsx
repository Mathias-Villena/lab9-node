'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface MovieDetail {
  Title: string;
  Year: string;
  Plot: string;
  Genre: string;
  Poster: string;
  Director: string;
  Actors: string;
  imdbRating: string;
}

interface Props {
  imdbID: string;
  onClose: () => void;
}

export default function MovieModal({ imdbID, onClose }: Props) {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`
      );
      setMovie(response.data);
      setLoading(false);
    };
    fetchMovie();
  }, [imdbID]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-white/10 text-white p-6 rounded-xl shadow-lg backdrop-blur-md animate-fade-in">
          Cargando detalles...
        </div>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] flex flex-col md:flex-row border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/no-image.jpg'}
          alt={movie.Title}
          className="w-full md:w-1/2 h-80 md:h-auto object-cover brightness-90 hover:brightness-100 transition"
        />

        <div className="p-6 overflow-y-auto text-white flex-1 relative">
          <h2 className="text-3xl font-bold mb-2 text-red-400 drop-shadow-md">{movie.Title}</h2>
          <p className="text-gray-300 mb-2">
            {movie.Year} • ⭐ {movie.imdbRating}
          </p>
          <p className="text-sm text-gray-400 italic mb-3">{movie.Genre}</p>
          <p className="text-gray-200 mb-4 leading-relaxed">{movie.Plot}</p>

          <div className="text-sm space-y-1">
            <p>
              🎬 <span className="font-semibold">Director:</span> {movie.Director}
            </p>
            <p>
              🎭 <span className="font-semibold">Actores:</span> {movie.Actors}
            </p>
          </div>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white rounded-full px-3 py-1 text-sm font-bold shadow-lg transition"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
