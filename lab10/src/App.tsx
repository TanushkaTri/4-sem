import MainPage from "./components/MainPage";
import { ConditionsProvider } from "./contexts/ConditionsContext";
import { FieldProvider } from "./contexts/FieldContext";
import { KeyProvider } from "./contexts/KeyContext";
import { VictoryProvider } from "./contexts/VictoryContext";
import sudokuGen from "./utils/sudokuGen";

function App() {
  const empty_cells: number = 40;

  // initial field
  const gameField: number[][] = sudokuGen(empty_cells);
  // current state of the field
  const currentField: number[][] = JSON.parse(JSON.stringify(gameField));
  // solution

  return (
    <KeyProvider>
      <ConditionsProvider>
        <FieldProvider initialField={gameField} currentField={currentField}>
          <VictoryProvider>
            <MainPage empty_cells={empty_cells} />
          </VictoryProvider>
        </FieldProvider>
      </ConditionsProvider>
    </KeyProvider>
  );
}

export default App;
