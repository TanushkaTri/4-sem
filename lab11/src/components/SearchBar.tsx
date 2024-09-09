interface SeatchbarProps {
  inStock: boolean;
  changeInStock: (checked: boolean) => void;
  filterText: string;
  changeFilterText: (filter: string) => void;
}

function SearchBar({
  inStock,
  changeInStock,
  filterText,
  changeFilterText,
}: SeatchbarProps) {
   
  const handleFilterTextChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    changeFilterText(e.currentTarget.value);
  };
 
  const handleInStockChange = (
    e: React.ChangeEvent<HTMLInputElement> 
  ): void => {
    changeInStock(e.target.checked);
  };

  return (
    <form className="w-full shadow-xl flex flex-col items-center justify-center bg-[#AFEEEE] bg-300 border-cyan-100 rounded-t-md">
      <input
        className="w-[80%] text-black bg-[#ffffff] border border-[cyan]-700 rounded-md px-2 mt-2 shadow-xl"
        type="text"
        placeholder="Search..."
        onChange={handleFilterTextChange}
      />
      <div className="flex mt-1 items-center justify-center">
        <input type="checkbox" onChange={handleInStockChange} />
        <h1 className="pl-1 text-gray-900 text-sm">
          Only show products in stock
        </h1>
      </div>
    </form>
  );
}

export default SearchBar;
