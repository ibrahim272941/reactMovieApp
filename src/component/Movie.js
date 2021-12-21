import React, { useEffect, useState } from "react";

const IMG_API = "https://image.tmdb.org/t/p/original";
// const VIDEO_API = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=<<api_key>>&language=en-US`;

function Movie({
  title,
  poster_path,
  id,
  overview,
  vote_average,
  release_date,
}) {
  const youtubeUrl = "https://www.youtube.com/embed/";
  const [trailer, setTrailer] = useState("");

  const handleId = () => {
    console.log(id);
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=0dfeb1e3115d788bdd6ccd6d217d93cf&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        const [trailer] = data.results;
        const key = trailer.key;
        setTrailer(key);
      });
  };

  return (
    <div className="movie">
      <img src={IMG_API + poster_path} alt={title} />
      <div className="movie-info">
        <h4>{title}</h4>
        <span>{vote_average}</span>
      </div>

      <div className="movie-over">
        <h3>Overview</h3>
        <h5>Release Date :{release_date}</h5>
        <a
          className="trailer"
          onClick={handleId}
          target="_blank"
          rel="noreferrer"
        >
          Watch the Trailer
        </a>
        <iframe
          style={trailer ? { display: "block" } : { display: "none" }}
          src={youtubeUrl + trailer}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        {/* <img src={IMG_API + backdrop_path} alt={title} /> */}

        <p>{overview}</p>
      </div>
    </div>
  );
}

export default Movie;
