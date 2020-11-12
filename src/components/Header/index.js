import React from "react";
import "./Header.css";

function Header () {
    return (
        <div className="header">
            <h1>Employee Directory</h1>
            <p>Click on the Name heading to sort the Employees or use the search box to narrow your results</p>
        </div>
    )
}

export default Header;