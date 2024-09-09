import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

interface HeaderProps {
  filterChange: (value: string) => void;
}

function Header({ filterChange }: HeaderProps) {
  return (
    <div className="w-full h-[70px] fixed bg-[#000000]">
      <div className="w-screen h-full gap-10 flex justify-center items-center">
        
        <Link to="/movies" className="text-[#ffffff]  ">
          Фильмы
        </Link>
        <Link to="/series" className="text-[#ffffff]  ">
          Сериалы
        </Link>
        <Link to="/" className="text-[#ffffff] ">
          Все
        </Link>

        <SearchBar filterChange={filterChange} />
      </div>
    </div>
  );
}

export default Header;
