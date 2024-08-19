import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <div className="header">
            <Link data-testid="HomePage" to="/">Home</Link>
            <Link data-testid="BooksList" to="/BooksList">Books</Link>
        </div>
    );
}

export default NavBar;
