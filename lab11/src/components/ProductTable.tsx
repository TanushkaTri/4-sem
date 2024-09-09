import { Product } from "../state";
import ProductCategoryRow from "./ProductCategoryRow";
import ProductRow from "./ProductRow";

interface ProductTableProps {
  filterText: string;
  inStockOnly: boolean;
  products: Array<Product>;
}

function ProductTable({
  products,
  filterText,
  inStockOnly,
}: ProductTableProps) {
  const rows: JSX.Element[] = []; 
  let lastCategory = ""; 

  products.forEach((product) => {
    if (product.name.indexOf(filterText) === -1) {
      return;
    }

    if (inStockOnly && !product.stocked) {
      return;
    }

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />  
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category; // добавл новый компонент с инф о тек продукте
  });

  return (
    <div className="bg-[#E0FFFF] h-[330px] rounded-b-md flex flex-col items-center">
      <h1 className="text-black text-300">Name  Price</h1>
      {rows}
    </div>
  );
}

export default ProductTable;
