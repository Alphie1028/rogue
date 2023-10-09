import React, { useEffect, useState } from 'react';

function Player({walls,spawn,keyPosition,setKeyPosition,inventory,setInventory,enemyPosition,setPlayerHealth}) {
    const WIDTH = 20;  // width in player units
    const HEIGHT = 20;  // height in player units

    const centerX = Math.floor(WIDTH / 2);
    const centerY = Math.floor(HEIGHT / 2);

    const [playerPosition, setPlayerPosition] = useState(spawn || { x: centerX, y: centerY }); // Use spawn as initial position if provided
    

    const handleKeyPress = (e) => {
        let newX = playerPosition.x;
        let newY = playerPosition.y;

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
                    break;
            }

        const hitsWall = walls && walls.some(wall => wall.x === newX && wall.y === newY);
        const hitsEnemy = enemyPosition.x === newX && enemyPosition.y === newY;

        if (!hitsWall && !hitsEnemy) {
            setPlayerPosition({ x: newX, y: newY });

            // If the player is on top of the key, add the key to the inventory and remove the key from the board
            if (newX === keyPosition.x && newY === keyPosition.y) {
                setInventory(prevInventory => [...prevInventory, "key"]);
                setKeyPosition({ x: -1, y: -1 });
            }

            // Check for adjacent enemy position
            if (
                (newX === enemyPosition.x && Math.abs(newY - enemyPosition.y) === 1) ||
                (newY === enemyPosition.y && Math.abs(newX - enemyPosition.x) === 1)
            ) {
                setPlayerHealth(prevHealth => prevHealth - 100);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [playerPosition, keyPosition, walls, inventory]);

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


