import React from "react";

function Portal({ x, y }) {
    return (
        <div
            className="portal"
            style={{
                backgroundColor: 'purple',
                transform: `translate(${x * 16}px, ${y * 16}px)`
            }}
        ></div>
    );
}

export default Portal;