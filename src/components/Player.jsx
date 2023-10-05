import React, { useEffect, useState } from 'react';

function Player({walls,spawn,keyPosition,setKeyPosition,inventory,setInventory}) {
    const WIDTH = 20;  // width in player units
    const HEIGHT = 20;  // height in player units

    const centerX = Math.floor(WIDTH / 2);
    const centerY = Math.floor(HEIGHT / 2);

    const [playerPosition, setPlayerPosition] = useState(spawn || { x: centerX, y: centerY }); // Use spawn as initial position if provided
    

    const handleKeyPress = (e) => {
        setPlayerPosition(prevPosition => {
            let newX = prevPosition.x;
            let newY = prevPosition.y;

            switch (e.key) {
                case 'w':
                    newY = Math.max(0, newY - 1);
                    break;
                case 's':
                    newY = Math.min(HEIGHT - 1, newY + 1);
                    break;
                case 'a':
                    newX = Math.max(0, newX - 1);
                    break;
                case 'd':
                    newX = Math.min(WIDTH - 1, newX + 1);
                    break;
                default:
                    return prevPosition;  // Return previous state if no movement key pressed
            }

            // Check against walls
            const hitsWall = walls && walls.some(wall => wall.x === newX && wall.y === newY);
            if (hitsWall) {
                return prevPosition;  // Return previous state if hits wall
            }

            if (newX === keyPosition.x && newY === keyPosition.y) {
                setInventory(prevInventory => [...prevInventory, "key"]);
                setKeyPosition({ x: -1, y: -1 });
            }

            return { x: newX, y: newY };
        });
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

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


