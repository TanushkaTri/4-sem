import AddTodo from "./components/AddTodo";
import Footer from "./components/Footer";
import VisibleTodoList from "./containers/VisibleTodoList";

function App() {
  return (
    <div className="h-full w-full min-h-screen min-w-screen bg-[#70526e] flex flex-col items-center">
      <div className="mt-[200px]">
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </div>
    </div>
  );
}

export default App;
