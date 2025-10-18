'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieModal from './MovieModal';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState('marvel');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;

  const searchMovies = async (term: string) => {
    if (!term) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${term}`
      );
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchMovies(query);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-blue-500 to-sky-400 p-8">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">
          🎞️ Búsqueda de Películas (CSR + Modal)
        </h1>

        <input
          type="text"
          placeholder="Escribe el nombre de una película..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-2/3 mx-auto block p-3 mb-6 rounded-lg border-2 border-white text-gray-700 font-semibold text-center"
          onKeyDown={(e) => e.key === 'Enter' && searchMovies(query)}
        />

        <button
          onClick={() => searchMovies(query)}
          className="bg-white text-blue-600 font-bold px-6 py-2 rounded-lg mb-8 hover:bg-blue-100 transition"
        >
          Buscar
        </button>

        {loading ? (
          <p className="text-white text-lg">Cargando resultados...</p>
        ) : movies.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.imdbID}
                className="bg-white/90 backdrop-blur rounded-2xl shadow-2xl overflow-hidden border-4 border-white hover:scale-105 transition-transform duration-200 cursor-pointer"
                onClick={() => setSelectedMovie(movie.imdbID)}
              >
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : '/no-image.jpg'}
                  alt={movie.Title}
                  className="w-full h-80 object-cover"
                />
                <div className="p-4 text-center">
                  <h2 className="font-bold text-gray-800 text-lg">{movie.Title}</h2>
                  <p className="text-gray-600 text-sm">{movie.Year}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white text-xl">No se encontraron resultados.</p>
        )}

        {/* Modal */}
        {selectedMovie && (
          <MovieModal imdbID={selectedMovie} onClose={() => setSelectedMovie(null)} />
        )}
      </div>
    </main>
  );
}
