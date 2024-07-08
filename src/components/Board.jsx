export default function Board({ setCurrentPlayer, board }) {
  return (
    <>
      <ol id="game-board">
        {board.map((row, rowIdx) => (
          <li key={rowIdx}>
            <ol>
              {row.map((col, colIdx) => (
                <li key={colIdx}>
                  <button
                    onClick={() => setCurrentPlayer(rowIdx, colIdx)}
                    disabled={col !== null}
                  >
                    {col}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </>
  );
}
