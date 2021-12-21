import React, { useEffect, useState } from "react";
import Movie from "./component/Movie";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0dfeb1e3115d788bdd6ccd6d217d93cf&page=";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=0dfeb1e3115d788bdd6ccd6d217d93cf&query=";
// const VIDEO_API =
//   "https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=0dfeb1e3115d788bdd6ccd6d217d93cf&language=en-US";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [nextPage, setNextPage] = useState(1);

  useEffect(() => {
    getMovies(FEATURED_API + nextPage);
  }, [nextPage]);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    getMovies(SEARCH_API + searchTerm);
    if (searchTerm) {
      setSearchTerm("");
    }
  };
  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <>
      <header>
        <h1>
          Movie <span>Database </span>
        </h1>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="search"
            placeholder="Search Film"
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
        <div className="button-group">
          <button
            onClick={() =>
              setNextPage(nextPage === 1 ? nextPage : nextPage - 1)
            }
          >
            Prev
          </button>
          <button onClick={() => setNextPage(nextPage + 1)}>Next</button>
        </div>
      </header>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

export default App;
