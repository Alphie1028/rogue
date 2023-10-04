import './App.css'
import Player from './components/Player'
import Wall from './components/Wall'

function App() {

  const walls = [
    { x: 3, y: 3 },
    { x: 4, y: 3 },
    { x: 5, y: 3 },
    { x: 3, y: 5 },
    { x: 3, y: 6 },
  ];

  return (
    <div className="gameContainer">
      <Player walls={walls}></Player>
      {walls.map((wall, idx) => <Wall key={idx} x={wall.x} y={wall.y} />)}
    </div>  
  )
}

export default App
