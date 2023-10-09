import React from 'react';

function GameOver({ onRestart }) {
    return (
        <div className="game-over-container">
            <h1>Game Over</h1>
            <button onClick={onRestart}>Try Again?</button>
        </div>
    );
}

export default GameOver;