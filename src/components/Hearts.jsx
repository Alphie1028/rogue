import React from "react";

function Hearts({playerHealth}){
    const fullHearts = Math.max(0, Math.min(3, Math.floor(playerHealth / 100)));
    const emptyHearts = 3 - fullHearts;

    return(
        <>
            {Array(fullHearts).fill(null).map((_, idx) => <span key={idx} className="heart full">❤️</span>)}
            {Array(emptyHearts).fill(null).map((_, idx) => <span key={idx + fullHearts} className="heart empty">🤍</span>)}
        </>
    );
}

export default Hearts;