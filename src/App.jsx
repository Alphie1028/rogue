import './App.css'
import React, {useState, useEffect} from 'react';
import Player from './components/Player';
import Wall from './components/Wall';
import Key from './components/Key';
import Inventory from './components/Inventory';
import Hearts from './components/Hearts';
import Enemy from './components/Enemy';
import GameOver from './components/GameOver';
import { generateMapWithSpawnAndKey } from './components/mapGenerator';

function App() {
  const initialState = generateMapWithSpawnAndKey();

  const [walls, setWalls] = useState(initialState.map);
  const [spawnPoint, setSpawnPoint] = useState(initialState.spawnPoint);
  const [keyPosition, setKeyPosition] = useState(initialState.keyPoint);
  const [inventory, setInventory] = useState([]);
  const [playerHealth, setPlayerHealth] = useState(300);
  const [enemyPosition, setEnemyPosition] = useState(initialState.enemyPoint);

  const restartGame = () => {
    // Reset the game state to the initial state
    const initialState = generateMapWithSpawnAndKey();
    setWalls(initialState.map);
    setSpawnPoint(initialState.spawnPoint);
    setKeyPosition(initialState.keyPoint);
    setInventory([]);
    setPlayerHealth(300);
    setEnemyPosition(initialState.enemyPoint);
  };

  if (playerHealth <= 0) {
    return <GameOver onRestart={restartGame} />;
  }

  return (
    <div className="appContainer">
      <Hearts playerHealth={playerHealth} />
      <Inventory items={inventory} />
      <div className="gameContainer">
        <Player 
        walls={walls} 
        spawn={spawnPoint} 
        keyPosition={keyPosition} 
        setKeyPosition={setKeyPosition} 
        inventory={inventory} 
        setInventory={setInventory}
        enemyPosition={enemyPosition}
        setPlayerHealth={setPlayerHealth}
        setEnemyPosition={setEnemyPosition}
        ></Player>
        {walls.map((wall, idx) => <Wall key={`wall-${idx}`} x={wall.x} y={wall.y} />)}
        {keyPosition.x >= 0 && keyPosition.y >= 0 && <Key x={keyPosition.x} y={keyPosition.y} />}
        <Enemy x={enemyPosition.x} y={enemyPosition.y} />
      </div>
    </div>
  )
}


export default App
