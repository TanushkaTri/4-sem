import { CELL_STATE, CHECK_STATE } from "../contexts/FieldContext";

interface CellProps {
  cell_i: number;
  cell_j: number;
  block_i: number;
  block_j: number;
  currentField: number[][];
  states: CELL_STATE[][];
  checks: CHECK_STATE[][];
  selectedCell: { i: number; j: number };
  selectCell: (cell: { i: number; j: number }) => void;
}

function Cell({
  cell_i,
  cell_j,
  block_i,
  block_j,
  currentField,
  states,
  checks,
  selectedCell,
  selectCell,
}: CellProps) {
  console.log("RENDERED");

  const pos_i: number = block_i * 3 + cell_i;
  const pos_j: number = block_j * 3 + cell_j;

  const value = currentField[pos_i][pos_j];

  const getContent = () => {
    let content;

    if (states[pos_i][pos_j] === CELL_STATE.INITIAL) {
      if (checks[pos_i][pos_j] === CHECK_STATE.INCORRECT_PATH) {
        content = (
          <div className="text-black flex text-2xl font-semibold justify-center items-center w-16 h-16 bg-white   hover:border-[#000000] border-2 border-[#8B0000] border-400 cursor-default transition-all">
            {value}
          </div>
        );
      } else {
        content = (
          <div className="text-black flex text-2xl font-semibold justify-center items-center w-16 h-16 bg-white   hover:border-[#000000] hover:border-2 cursor-default transition-all">
            {value}
          </div>
        );
      }
    } else if (states[pos_i][pos_j] === CELL_STATE.EMPTY) {
      if (checks[pos_i][pos_j] === CHECK_STATE.INCORRECT_PATH) {
        content = (
          <div className="flex text-2xl font-semibold justify-center items-center w-16 h-16 bg-white   hover:border-[#000000] border-[#8B0000] border-400 border-2 cursor-pointer transition-all">
            {selectedCell.i === pos_i && selectedCell.j === pos_j ? (
              <div className="border-[#8B0000] border-400 border-2  w-12 h-12 shadow-lg transition-all duration-100 bg-transparent"/>
            ) : (
              <div className="bg-[#8B0000] bg-400  w-2 h-2 transition-all" />
            )}
          </div>
        );
      } else {
        content = (
          <div className="flex text-2xl font-semibold justify-center items-center w-16 h-16 bg-white border-[#000000] border-1 hover:border-[#000000] hover:border-4 cursor-pointer transition-all">
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
          <div className="text-[#000000] flex text-2xl font-semibold justify-center items-center w-16 h-16 bg-white   hover:border-[#000000] border-[#8B0000] border-400 border-4 cursor-default transition-all">
            {value}
          </div>
        );
      } else {
        content = (
          <div className="text-[#000000] flex text-2xl font-semibold justify-center items-center w-16 h-16 bg-white border-1 border-[#000000]  hover:border-[#000000] hover:border-4 cursor-default transition-all">
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
        ) {
          selectCell({ i: pos_i, j: pos_j });
        }
      }}
    >
      {getContent()}
    </div>
  );
}

export default Cell;
