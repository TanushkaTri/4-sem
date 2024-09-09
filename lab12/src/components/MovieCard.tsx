import { MovieType } from "../api/movieAPI";

interface MovieCardProps {
  movie: MovieType;
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="w-[260px] h-[400px] rounded-xl shadow-xl mt-1  border-[#000000] ">
      <div className="w-[90%] h-[80%] flex justify-center  items-center border-1 border-[#000000] shadow-md">
        <img
          className="h-full w-full border-1 shadow-md transition-all "
          src={movie.Poster}
          alt={`${movie.Title} (${movie.Year}) (${movie.Type})`}
        />
      </div>
      <div className="mt-1 ml-1">
        <h2 className="text-sm font-medium text-black">{movie.Title}</h2>
        <h2 className="text-sm font-medium text-black">{movie.Year}</h2>
        <h2 className="text-sm font-medium text-[#201b59]">{movie.Type}</h2>
      </div>
    </div>
  );
}

export default MovieCard;
