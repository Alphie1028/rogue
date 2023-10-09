import React from "react";

function Enemy({ x, y}){
    return(
        <div
            className="enemy"
            style={{
                transform: `translate(${x * 16}px, ${y * 16}px)`
            }}
        ></div>

    );
}

export default Enemy;