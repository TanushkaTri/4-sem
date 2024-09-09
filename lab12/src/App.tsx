import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Catalog from "./components/Catalog";
import Header from "./components/Header";

function App() {
  const [filter, setFilter] = useState<string>("");

  return (
    <BrowserRouter>
      <div className="w-screen min-h-screen h-full flex flex-col items-center bg-[#ffffff]">
        <Header filterChange={setFilter} />
        <div className="mt-[100px]">
          <Routes>
            <Route
              path="/movies"
              element={<Catalog type="movie" filter={filter} />}
            />
            <Route
              path="/series"
              element={<Catalog type="series" filter={filter} />}
            />
            <Route path="/" element={<Catalog type="all" filter={filter} />} />
          </Routes>
        </div>
      </div>
      
    </BrowserRouter>
  );
}

export default App;
