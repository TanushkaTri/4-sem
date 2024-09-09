export const insertIntoCell = (info: { value: number }) => ({
  type: "INSERT_INTO_CELL",
  value: info.value,
});

export const getHint = () => ({
  type: "GET_HINT",
});

export const restart = () => ({
  type: "RESTART",
});

export const selectCell = (info: { i: number; j: number }) => ({
  type: "SELECT_CELL",
  i: info.i,
  j: info.j,
});
