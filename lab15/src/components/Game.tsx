import modifyMatrix from "../utils/modifyMatrix";
import Block from "./Block";

interface GameProps {
  currentField: number[][];
}

function Game({ currentField }: GameProps) {
  console.log(currentField);
  const modifiedField = currentField ? modifyMatrix(currentField) : [];

  const iterator: number[] = [0, 1, 2];

  return (
    <div className="grid grid-cols-3 gap-2">
      {iterator.map((i) =>
        iterator.map((j) => (
          <Block
            key={i * 3 + j}
            // 3x3 submatrix
            submatrix={modifiedField[i][j]}
            // i and j of 3x3 div block
            i_num={i}
            j_num={j}
          />
        ))
      )}
    </div>
  );
}

export default Game;
