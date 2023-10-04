import React from "react";

function Wall({x,y}){
    return(
        <div
            className="wall"
            style={{
                transform: `translate(${x * 16}px, ${y * 16}px)`
            }}
        />
    )
}
export default Wall;