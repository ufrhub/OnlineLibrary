import React from "react";
import "./Header.css";
import Logo from "../../Assets/logo.png";

const MainHeader = () => {
    return (
        <header>
            <div className="logo">
                <img src={Logo} alt="Logo" />
            </div>

            <nav>
                <div>Browse Books</div>
                <div>Add Book</div>
            </nav>
        </header>
    );
};

export default MainHeader;