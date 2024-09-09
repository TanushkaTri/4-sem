import { useState } from "react";
import { Product } from "../state";
import { table_container } from "../style";
import ProductTable from "./ProductTable";
import SearchBar from "./SearchBar";

interface FilterableProductTableProps {
  products: Array<Product>;
}

function FilterableProductTable({ products }: FilterableProductTableProps) {
  const [filterText, setFilterText] = useState<string>("");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  return (
    <div className={table_container}>
      <SearchBar
        filterText={filterText}
        inStock={inStockOnly}
        changeFilterText={setFilterText}
        changeInStock={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

export default FilterableProductTable;
