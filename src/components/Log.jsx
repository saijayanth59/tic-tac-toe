export default function Log({ turns, names }) {
  return (
    <>
      <ol id="log">
        {turns.map((turn) => {
          return (
            <>
              <li key={`${turn.square.row}, ${turn.square.col}`}>
                {names[turn.player]} Selected {turn.square.row},{" "}
                {turn.square.col}
              </li>
            </>
          );
        })}
      </ol>
    </>
  );
}
