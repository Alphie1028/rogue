import './App.css'
import React from 'react';
import Player from './components/Player'
import Wall from './components/Wall'
import { generateMapWithSpawn } from './components/mapGenerator';

function App() {

  const { map: walls, spawnPoint } = generateMapWithSpawn();

  return (
    <div className="gameContainer">
      <Player walls={walls} spawn={spawnPoint}></Player>
      {walls.map((wall, idx) => <Wall key={idx} x={wall.x} y={wall.y} />)}
    </div>  
  )
}

export default App
