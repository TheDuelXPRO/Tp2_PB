import React, { useEffect, useState } from "react";
import "./App.css";
import Movie from "./Movie";

export default function App() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNzAzYWRlZmZhMTRkMWQ5MDFlNzY3MzdiZjdkYjg1ZCIsIm5iZiI6MTcyNDMyNTAwOC44MTUwMTgsInN1YiI6IjY2YzcxYjJlNjEzMTEyZmQ1YmIyZTI5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vmIHavyejId57uQWlNR1R5KkxVrcPaxPt-XHHz_in1o";

  useEffect(() => {
    // Busca os gêneros de filmes na API do TMDB
    fetch("https://api.themoviedb.org/3/genre/movie/list", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: apiKey,
      },
    })
      .then((response) => response.json())
      .then((response) => setGenres(response.genres))
      .catch((err) => console.error(err));
  }, []);

  const fetchMoviesByGenre = (genreId) => {
    setLoading(true);
    setError(null);

    // Busca filmes com base no gênero selecionado
    fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: apiKey,
        },
      },
    )
      .then((response) => response.json())
      .then((response) => {
        setMovies(response.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
  };

  const handleGenreChange = (event) => {
    const genreId = event.target.value;
    setSelectedGenre(genreId);
    fetchMoviesByGenre(genreId);
  };

  return (
    <main>
      <h1>Filmes por Categoria</h1>

      {/* Dropdown de seleção de gêneros */}
      <select onChange={handleGenreChange} value={selectedGenre || ""}>
        <option value="" disabled>
          Selecione um gênero
        </option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      {/* Exibe mensagem de carregamento, erro ou a lista de filmes */}
      {loading ? (
        <p>Carregando filmes...</p>
      ) : error ? (
        <p>Ocorreu um erro: {error.message}</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              title={movie.title}
              overview={movie.overview}
            />
          ))}
        </ul>
      )}
    </main>
  );
}
