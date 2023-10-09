import React, { useEffect, useState } from 'react';

function Player({ walls, spawn, keyPosition, setKeyPosition, inventory, setInventory, enemyPosition, setPlayerHealth, setEnemyPosition, portalPosition, resetGame}) {
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

        // Determine enemy's potential move based on where the player plans to go
        const newEnemyPosition = determineEnemyMove(enemyPosition, { x: newX, y: newY }, walls);

        // Check for potential collisions for the player
        const hitsWall = walls && walls.some(wall => wall.x === newX && wall.y === newY);
        const hitsEnemy = newEnemyPosition.x === newX && newEnemyPosition.y === newY;
        const entersPortal = newX === portalPosition.x && newY === portalPosition.y;

        if (!hitsWall && !hitsEnemy) {
            setPlayerPosition({ x: newX, y: newY });
            setEnemyPosition(newEnemyPosition);

            // If the player moves on top of the key, add the key to the inventory and remove the key from the board
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

            if (entersPortal) {
                resetGame();
            }
        }
    };

    const determineEnemyMove = (enemyPos, playerPos, walls) => {
        const xDiff = enemyPos.x - playerPos.x;
        const yDiff = enemyPos.y - playerPos.y;

        let newEnemyPos = { ...enemyPos };  // Start with current enemy position

        // If horizontal distance is greater or equal to vertical, try moving horizontally
        if (Math.abs(xDiff) >= Math.abs(yDiff)) {
            newEnemyPos.x = xDiff > 0 ? enemyPos.x - 1 : enemyPos.x + 1;
            if (isBlocked(newEnemyPos, walls)) {
                newEnemyPos.x = enemyPos.x;  // Reset x if blocked
                newEnemyPos.y = yDiff > 0 ? enemyPos.y - 1 : enemyPos.y + 1;  // Try vertical move
            }
        } else {
            newEnemyPos.y = yDiff > 0 ? enemyPos.y - 1 : enemyPos.y + 1;
            if (isBlocked(newEnemyPos, walls)) {
                newEnemyPos.y = enemyPos.y;  // Reset y if blocked
                newEnemyPos.x = xDiff > 0 ? enemyPos.x - 1 : enemyPos.x + 1;  // Try horizontal move
            }
        }

        if (isBlocked(newEnemyPos, walls)) {
            return enemyPos;  // Return original position if both directions are blocked
        }
        if (newEnemyPos.x === playerPos.x && newEnemyPos.y === playerPos.y) {
            return enemyPos; // Stay in the current position if moving would overlap the player
        }
        return newEnemyPos;
    };

    const isBlocked = (position, walls) => {
        return walls.some(wall => wall.x === position.x && wall.y === position.y);
    };
    
    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [playerPosition, keyPosition, walls, inventory, enemyPosition, portalPosition]);

    useEffect(() => {
        const checkForEnemyContact = () => {
            if (
                (playerPosition.x === enemyPosition.x && Math.abs(playerPosition.y - enemyPosition.y) === 1) ||
                (playerPosition.y === enemyPosition.y && Math.abs(playerPosition.x - enemyPosition.x) === 1)
            ) {
                setPlayerHealth(prevHealth => prevHealth - 100);
            }
        };

        checkForEnemyContact();  // Call immediately

        const intervalId = setInterval(checkForEnemyContact, 1000); // Check every 10 seconds after that

        return () => {
            clearInterval(intervalId); // Clear the interval when component unmounts or state changes
        };
    }, [playerPosition, enemyPosition]);

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


