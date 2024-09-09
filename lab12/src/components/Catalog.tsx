import { useEffect, useState } from "react";
import { moviesAPI, MovieType } from "../api/movieAPI";
import MovieCard from "./MovieCard";

interface CatalogProps {
  type: "movie" | "series" | "all";
  filter: string;
}

function Catalog({ type, filter }: CatalogProps) {
  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    moviesAPI
      .getMovies(filter === "" ? "home" : filter, type)
      .then((data) => data && setMovies(data));
  }, [type, filter]);

  return (
    <div className="flex flex-wrap gap-5 justify-center">
      <div className="w-[95%] flex flex-wrap gap-3 justify-center">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Catalog;
