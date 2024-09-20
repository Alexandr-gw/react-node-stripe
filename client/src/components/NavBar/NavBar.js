import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import LoginBtn from "../Auth/LoginBtn/LoginBtn";
import AdminPanelBtn from "../AdminPanel/AdminPanelBtn";

const NavBar = () => {
    return (
        <div className="header">
            <div>
                <div>Logo</div>
            </div>
            <div className="navButtons">
                <Link data-testid="HomePage" to="/">Home</Link>
                <Link data-testid="BooksList" to="/BooksList">Books</Link>
                <AdminPanelBtn />
            </div>
            <div>
                <LoginBtn />
            </div>
        </div>
    );
};

export default NavBar;
