import React from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";

const BookCard = ({ Book }) => {
    const Navigate = useNavigate();

    const HandleNavigate = () => {
        Navigate(`/book-details/${Book.title}`);
    }

    return (
        <div className="book-card" onClick={HandleNavigate}>
            <img src={Book.image} alt="Book" />
            <div className="ratings-and-price"><span>{Book.ratings}</span><span>${Book.price}</span></div>
            <div className="title">{Book.title}</div>
            <div className="author">{Book.author}</div>
        </div>
    );
};

export default BookCard;