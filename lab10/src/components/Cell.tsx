import { useContext, useEffect, useState } from "react";
import { ConditionsCtx } from "../contexts/ConditionsContext";
import {
  CELL_STATE,
  CHECK_STATE,
  FieldContext,
} from "../contexts/FieldContext";
import { KeyContext } from "../contexts/KeyContext";

interface CellProps {
  cell_i: number;
  cell_j: number;
  block_i: number;
  block_j: number;
}

function Cell({ cell_i, cell_j, block_i, block_j }: CellProps) {
  const pos_i: number = block_i * 3 + cell_i;
  const pos_j: number = block_j * 3 + cell_j;

  const { currentField, states, checks } = useContext(FieldContext);
  const [value, setValue] = useState<number>(currentField[pos_i][pos_j]);
  const { selectedCell, setSelectedCell } = useContext(ConditionsCtx);
  const { pressedKey } = useContext(KeyContext);

  useEffect(() => {
    if (currentField[pos_i][pos_j] !== value) {
      setValue(currentField[pos_i][pos_j]);
    }
    if (selectedCell.i === pos_i && selectedCell.j === pos_j) {
      setValue(currentField[pos_i][pos_j]);
    }
  }, [currentField, states, checks]);

  const getContent = () => {
    let content;

    if (states[pos_i][pos_j] === CELL_STATE.INITIAL) {
      if (checks[pos_i][pos_j] === CHECK_STATE.INCORRECT_PATH) {
        content = (
          <div className="text-black flex text-2xl font-semibold justify-center items-center w-16 h-16 bg-white rounded-md  hover:border-[#000000] border-2 border-[#8B0000] border-400 cursor-default transition-all">
            {value}
          </div>
        );
      } else {
        content = (
          <div className="text-black flex text-2xl font-semibold justify-center items-center w-16 h-16 bg-white  rounded-md hover:border-[#000000] hover:border-2 cursor-default transition-all">
            {value}
          </div>
        );
      }
    } else if (states[pos_i][pos_j] === CELL_STATE.EMPTY) {
      if (checks[pos_i][pos_j] === CHECK_STATE.INCORRECT_PATH) {
        content = (
          <div className="flex text-2xl font-semibold justify-center items-center w-16 h-16 bg-white   rounded-md hover:border-[#000000] border-[#8B0000] border-400 border-2 cursor-pointer transition-all">
            {selectedCell.i === pos_i && selectedCell.j === pos_j ? (
              <div className="border-[#8B0000] border-400 border-2  w-12 h-12 shadow-lg transition-all duration-100 bg-transparent" />
            ) : (
              <div className="bg-[#8B0000] bg-400  w-2 h-2 transition-all" />
            )}
          </div>
        );
      } else {
        content = (
          <div className="flex text-2xl font-semibold justify-center items-center w-16 h-16 bg-white rounded-md border-[#000000] border-1 hover:border-[#000000] hover:border-4 cursor-pointer transition-all">
            {selectedCell.i === pos_i && selectedCell.j === pos_j ? (
              <div className="border-[#000000] border-2  w-12 h-12 shadow-lg transition-all duration-100 bg-transparent" />
            ) : (
              <div className="bg-[#000000]  w-1 h-1 transition-all" />
            )}
          </div>
        );
      }
    } else if (states[pos_i][pos_j] === CELL_STATE.INSERTED) {
      if (checks[pos_i][pos_j] === CHECK_STATE.INCORRECT_PATH) {
        content = (
          <div className="text-[#000000] flex text-2xl font-semibold justify-center items-center w-16 h-16 bg-white  rounded-md hover:border-[#000000] border-[#8B0000] border-400 border-4 cursor-default transition-all">
            {value}
          </div>
        );
      } else {
        content = (
          <div className="text-[#000000] flex text-2xl font-semibold justify-center items-center w-16 h-16 bg-white border-1 rounded-md border-[#000000]  hover:border-[#000000] hover:border-4 cursor-default transition-all">
            {value}
          </div>
        );
      }
    } else if (states[pos_i][pos_j] === CELL_STATE.HINTED) {
      if (checks[pos_i][pos_j] === CHECK_STATE.INCORRECT_PATH) {
        content = (
          <div className="text-[#FFFF00] text-600 flex text-2xl font-semibold justify-center items-center w-16 h-16 bg-white rounded-md hover:border-[#000000] border-4 border-[#8B0000] border-400 cursor-default transition-all">
            {value}
          </div>
        );
      } else {
        content = (
          <div className="text-[#FFFF00] text-600 flex text-2xl font-semibold justify-center items-center w-16 h-16 bg-white rounded-md border-1 border-[#000000] hover:border-[#000000] hover:border-4 cursor-default transition-all">
            {value}
          </div>
        );
      }
    }
    return content;
  };

  return (
    <div
      onClick={() => {
        if (
          states[pos_i][pos_j] !== CELL_STATE.INITIAL &&
          states[pos_i][pos_j] !== CELL_STATE.HINTED
        )
          setSelectedCell({ i: pos_i, j: pos_j });
      }}
    >
      {getContent()}
    </div>
  );
}

export default Cell;
