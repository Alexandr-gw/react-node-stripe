import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import LoginBtn from "../Auth/LoginBtn/LoginBtn";

const NavBar = () => {
    return (
        <div className="header">
            <div>
                <Link data-testid="HomePage" to="/">Home</Link>
                <Link data-testid="BooksList" to="/BooksList">Books</Link>
            </div>
            <div>
                <LoginBtn />
            </div>
        </div>
    );
};

export default NavBar;
