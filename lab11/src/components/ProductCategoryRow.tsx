interface ProductCategoryRowProps {
  category: string;
}

function ProductCategoryRow({ category }: ProductCategoryRowProps) {
  return (
    <div className="text-lg text-black-300 font-bold"> {category} </div>
  );
}

export default ProductCategoryRow;
