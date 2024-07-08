import PlayerInfo from "./components/PlayerInfo";
import Board from "./components/Board";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const INITIAL_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derveBoard(logs) {
  const board = structuredClone(INITIAL_BOARD);
  for (let turn of logs) {
    const { square, player } = turn;
    const { row, col } = square;
    board[row][col] = player;
  }
  return board;
}

function getCurrentPlayer(turns) {
  let player = "X";
  if (turns.length > 0 && turns[0].player == "X") {
    player = "O";
  }
  return player;
}

function App() {
  // const [currentPlayer, setCurrentPlayer] = useState("X");
  const [players, setPlayerNames] = useState({ X: "Player1", O: "Player2" });
  const [logs, updateLogs] = useState([]);
  let currentPlayer = getCurrentPlayer(logs);

  function handlePlayerNames(symbol, name) {
    setPlayerNames((prevNames) => {
      const copyNames = structuredClone(prevNames);
      copyNames[symbol] = name;
      return copyNames;
    });
  }

  function handleCurrentPlayer(row, col) {
    updateLogs(() => {
      let newLogs = [
        {
          square: { row: row, col: col },
          player: currentPlayer,
        },
        ...logs,
      ];
      return newLogs;
    });
  }

  const board = derveBoard(logs);

  let winner = null;
  for (const comb of WINNING_COMBINATIONS) {
    let first = board[comb[0].row][comb[0].column];
    let second = board[comb[1].row][comb[1].column];
    let third = board[comb[2].row][comb[2].column];
    if (first && first === second && second === third) {
      winner = first;
    }
  }
  let isDraw = !winner && logs.length == 9;

  return (
    <>
      <main>
        <div id="game-container">
          {/* Players */}
          <ol id="players" className="highlight-player">
            <PlayerInfo
              name={players["X"]}
              symbol="X"
              active={currentPlayer == "X"}
              onSave={handlePlayerNames}
            />
            <PlayerInfo
              name={players["O"]}
              symbol="O"
              active={currentPlayer == "O"}
              onSave={handlePlayerNames}
            />
          </ol>
          {/* Board */}
          {(winner || isDraw) && (
            <GameOver
              winner={players[winner]}
              rematch={updateLogs}
              draw={isDraw}
            />
          )}
          {isDraw && <p>Draw</p>}
          <Board setCurrentPlayer={handleCurrentPlayer} board={board} />
        </div>
        {/* Logs */}
        <div>
          <Log turns={logs} names={players} />
        </div>
      </main>
    </>
  );
}

export default App;
