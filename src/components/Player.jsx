import React, { useEffect, useState } from 'react';

function Player() {
    const WIDTH = 20;  // width in player units
    const HEIGHT = 20;  // height in player units

    const centerX = Math.floor(WIDTH / 2);
    const centerY = Math.floor(HEIGHT / 2);

    const [playerPosition, setPlayerPosition] = useState({ x: centerX, y: centerY });

    const handleKeyPress = (e) => {
        let newX = playerPosition.x;
        let newY = playerPosition.y;

        switch (e.key) {
            case 'w':
                newY = Math.max(0, playerPosition.y - 1);
                break;
            case 's':
                newY = Math.min(HEIGHT - 1, playerPosition.y + 1);
                break;
            case 'a':
                newX = Math.max(0, playerPosition.x - 1);
                break;
            case 'd':
                newX = Math.min(WIDTH - 1, playerPosition.x + 1);
                break;
            default:
                break;
        }

        setPlayerPosition({ x: newX, y: newY });
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [playerPosition]);

    return (
        <div
            className="player"
            style={{
                transform: `translate(${playerPosition.x * 16}px, ${playerPosition.y * 16}px)`
            }}
        />
    );
}

export default Player;


