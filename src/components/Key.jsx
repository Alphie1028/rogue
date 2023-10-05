import React from "react";

function Key({ x, y}) {
    return(
        <div
            className="key"
            style={{
                transform: `translate(${x*16}px, ${y*16}px)`
            }}
        />
    )
}

export default Key