import React from "react";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const Movie = ({movies}) => {
  const poster = movies.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movies.Poster;
  return (
    <div className="movie">
      <h2>{movies.Title}</h2>
      <div>
        <img width="200" alt={`The movie titled: ${movies.Title}`} src={poster}/>
      </div>
      <p>({movies.Year})</p>
    </div>
  );
};

export default Movie;