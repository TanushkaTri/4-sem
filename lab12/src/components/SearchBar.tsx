import { useState } from "react";

interface SearchBarProps {
  filterChange: (value: string) => void;
}

function SearchBar({ filterChange }: SearchBarProps) {
  const [filter, setFilter] = useState<string>("");

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          filterChange(e.target.value);
        }}
        className="w-[300px] h-[30px]  pl-1 bg-[rgba(255,255,255,0.8)] outline-none"
      />
    </div>
  );
}

export default SearchBar;
