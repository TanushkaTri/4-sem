import Counter from "./components/Counter";
import Square from "./components/Square";
function App() {

  const squareClicked = () => {
    console.log("Clicked!!!");
  }
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#000000] bg-500">
      <Counter />
      <div className="bg-[#ff2323] w-12 h-12 flex shadow-xl justify-center m-10 cursor-pointer"> 
      <Square   callback={squareClicked}
      /></div>
    </div>
  );
}

export default App;
 