import './App.css'
import React, {useState, useEffect} from 'react';
import Player from './components/Player'
import Wall from './components/Wall'
import Key from './components/Key';
import { generateMapWithSpawnAndKey } from './components/mapGenerator';

function App() {
  const initialState = generateMapWithSpawnAndKey();

  const [walls, setWalls] = useState(initialState.map);
  const [spawnPoint, setSpawnPoint] = useState(initialState.spawnPoint);
  const [keyPosition, setKeyPosition] = useState(initialState.keyPoint);

  return (
    <div className="gameContainer">
      <Player walls={walls} spawn={spawnPoint} keyPosition={keyPosition} setKeyPosition={setKeyPosition}></Player>
      {walls.map((wall, idx) => <Wall key={`wall-${idx}`} x={wall.x} y={wall.y} />)}
      {keyPosition.x >= 0 && keyPosition.y >= 0 && <Key x={keyPosition.x} y={keyPosition.y} />}
    </div>
  )
}


export default App
