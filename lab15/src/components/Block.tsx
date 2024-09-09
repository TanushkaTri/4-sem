import CellContainer from "../containers/CellContainer";

interface BlockProps {
  //3x3 submatrix for div block
  submatrix: number[][];
  // i and j of 3x3 div block
  i_num: number;
  j_num: number;
}

function Block({ submatrix, i_num, j_num }: BlockProps) {
  const iterator: number[] = [0, 1, 2];
  return (
    <div className="grid grid-cols-3 border-2 border-black bg-white">
      {iterator.map((i) =>
        iterator.map((j) => (
          // <Cell
          //   key={i * 3 + j}
          //   // i and j of cell in 3x3 submatrix
          //   block_i={i_num}
          //   block_j={j_num}
          //   // i and j of cell in 9x9 matrix
          //   cell_i={i}
          //   cell_j={j}
          // />

          <CellContainer
            key={i * 3 + j}
            // i and j of cell in 3x3 submatrix
            block_i={i_num}
            block_j={j_num}
            // i and j of cell in 9x9 matrix
            cell_i={i}
            cell_j={j}
          />
        ))
      )}
    </div>
  );
}

export default Block;
