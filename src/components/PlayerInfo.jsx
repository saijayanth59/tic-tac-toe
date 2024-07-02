import { useState } from "react";

export default function PlayerInfo({ name, symbol }) {
  const [isEditing, setIsEditing] = useState(false);
  const [player, setPlayer] = useState(name);

  function handleEditing() {
    setIsEditing((editing) => !editing);
  }

  function handleName(e) {
    setPlayer(e.target.value);
  }

  let playerName = <span className="player-name">{player}</span>;
  if (isEditing)
    playerName = (
      <input type="text" value={player} onChange={handleName} required />
    );

  return (
    <>
      <li>
        <span className="player">
          {playerName}
          <span className="player-symbol">{symbol}</span>
          <button onClick={handleEditing}>{isEditing ? "Save" : "Edit"}</button>
        </span>
      </li>
    </>
  );
}
