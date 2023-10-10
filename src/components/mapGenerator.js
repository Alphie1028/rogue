const WIDTH = 20;
const HEIGHT = 20;
const EMPTY = 0;
const WALL = 1;

export function createRoom(board, x, y, w, h) {
    for (let i = x; i < x + w; i++) {
        for (let j = y; j < y + h; j++) {
            if (i >= 0 && i < WIDTH && j >= 0 && j < HEIGHT) {
                board[j][i] = EMPTY;
            }
        }
    }
}

export function connectRooms(board, x1, y1, x2, y2) {
    let x = x1, y = y1;
    while (x !== x2) {
        if (x < x2) x++;
        else x--;
        board[y][x] = EMPTY;
    }
    while (y !== y2) {
        if (y < y2) y++;
        else y--;
        board[y][x] = EMPTY;
    }
}

export function generateMap() {
    const board = Array.from({ length: HEIGHT }, () => Array(WIDTH).fill(WALL));
    const rooms = [];

    for (let i = 0; i < 5; i++) {
        const w = Math.floor(Math.random() * 5) + 3;
        const h = Math.floor(Math.random() * 5) + 3;
        const x = Math.floor(Math.random() * (WIDTH - w - 1)) + 1;
        const y = Math.floor(Math.random() * (HEIGHT - h - 1)) + 1;
        createRoom(board, x, y, w, h);
        rooms.push({ x, y, w, h });
    }

    for (let i = 0; i < rooms.length - 1; i++) {
        const { x: x1, y: y1, w: w1, h: h1 } = rooms[i];
        const { x: x2, y: y2 } = rooms[i + 1];
        connectRooms(board, x1 + Math.floor(w1 / 2), y1 + Math.floor(h1 / 2), x2 + Math.floor(w1 / 2), y2 + Math.floor(h1 / 2));
    }

    const mapArray = [];
    for (let j = 0; j < HEIGHT; j++) {
        for (let i = 0; i < WIDTH; i++) {
            if (board[j][i] === WALL) {
                mapArray.push({ x: i, y: j });
            }
        }
    }

    return {mapArray, rooms};
}

export function generateMapWithSpawnAndKey() {
    const { mapArray, rooms } = generateMap();

    // Filter for open spaces on the board
    const openSpaces = [];
    for (let j = 0; j < HEIGHT; j++) {
        for (let i = 0; i < WIDTH; i++) {
            if (!mapArray.some(cell => cell.x === i && cell.y === j)) {
                openSpaces.push({ x: i, y: j });
            }
        }
    }

    const spawnRandomIndex = Math.floor(Math.random() * openSpaces.length);
    let spawnPoint = openSpaces[spawnRandomIndex];

    const getKeyPosition = (spawn) => {
        let keyPoint;
        do {
            const keyRandomIndex = Math.floor(Math.random() * openSpaces.length);
            keyPoint = openSpaces[keyRandomIndex];
        } while (Math.abs(keyPoint.x - spawn.x) <= 3 && Math.abs(keyPoint.y - spawn.y) <= 3);
        return keyPoint;
    }

    let keyPoint = getKeyPosition(spawnPoint);

    let enemyPoint;
    do {
        const enemyRandomIndex = Math.floor(Math.random() * openSpaces.length);
        enemyPoint = openSpaces[enemyRandomIndex];
    } while (
        (Math.abs(enemyPoint.x - spawnPoint.x) <= 3 && Math.abs(enemyPoint.y - spawnPoint.y) <= 3) ||
        (Math.abs(enemyPoint.x - keyPoint.x) <= 3 && Math.abs(enemyPoint.y - keyPoint.y) <= 3)
    );

    
    const isTooClose = (point1, point2, distance) => {
        return (Math.abs(point1.x - point2.x) <= distance && Math.abs(point1.y - point2.y) <= distance);
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // swap
        }
        return array;
    };

    let shuffledSpaces = shuffleArray([...openSpaces]);

    let portalPoint;
    for (let space of shuffledSpaces) {
        if (!isTooClose(space, spawnPoint, 3) && !isTooClose(space, keyPoint, 3) && !isTooClose(space, enemyPoint, 3)) {
            portalPoint = space;
            break;
        }
    }
    return { map: mapArray, spawnPoint, keyPoint, enemyPoint, portalPoint };
}