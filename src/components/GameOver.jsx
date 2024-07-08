export default function GameOver({ winner, rematch, draw }) {
  return (
    <>
      <div id="game-over">
        <h2>Game Over</h2>
        {winner && <p>{winner} is won</p>}
        {draw && <p>Draw</p>}
        <button onClick={() => rematch([])}>rematch</button>
      </div>
    </>
  );
}
