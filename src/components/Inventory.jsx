import React from "react";

function Inventory({ items }){
    return(
        <div className="inventory">
            <h3>Inventory</h3>
            <ul>
                {items.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </div>
    )
}

export default Inventory;