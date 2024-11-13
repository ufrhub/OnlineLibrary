import React from "react";
import "./Header.css";
import Logo from "../../Assets/logo.png";
import { Link } from "react-router-dom";

const MainHeader = () => {
    return (
        <header>
            <Link to={"/"} className="logo">
                <img src={Logo} alt="Logo" />
            </Link>

            <nav>
                <Link to={"/browseBooks"}>
                    Browse Books
                </Link>

                <Link to={"/addBook"}>
                    Add Book
                </Link>
            </nav>
        </header>
    );
};

export default MainHeader;