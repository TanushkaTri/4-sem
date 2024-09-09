import { Product } from "../state";

interface ProductRowProps {
  product: Product;
}

function ProductRow({ product }: ProductRowProps) {
  return (
    <div className="cursor-pointer flex gap-2 hover:text-xl transition-all my-1">
      <div className={`${product.stocked ? "text-gray-400" : "text-red-400"}`}>
        {product.name}
      </div>
      <div className="text-gray-400">{product.price}</div>
    </div>
  );
}

export default ProductRow;
