import FilterableProductTable from "./components/FilterableProductTable";
import PRODUCTS from "./state";
import { app_container } from "./style";

function App() {
  return (
    <div className={app_container}>
      <FilterableProductTable products={PRODUCTS} />
    </div>
  );
}

export default App;
