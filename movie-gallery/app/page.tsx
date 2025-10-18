import axios from "axios";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export default async function Home() {
  const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  const response = await axios.get(
    `https://www.omdbapi.com/?apikey=${apiKey}&s=marvel`
  );

  const movies: Movie[] = response.data.Search || [];

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-400 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-8 drop-shadow-lg">
          🎥 Galería de Películas (SSR)
        </h1>

        {movies.length === 0 ? (
          <p className="text-center text-white text-xl">
            No se encontraron películas.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.imdbID}
                className="bg-white/90 backdrop-blur rounded-2xl shadow-2xl overflow-hidden border-4 border-white hover:scale-105 transition-transform duration-200"
              >
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.jpg"}
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
        )}
      </div>
    </main>
  );
}
