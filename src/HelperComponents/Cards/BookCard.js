import React from "react";
import "./Card.css";

const BookCard = ({ Book }) => {
    console.log(Book)
    return (
        <div className="book-card">
            <img src={Book.image} alt="Book" />
            <div className="ratings-and-price"><span>{Book.ratings}</span><span>${Book.price}</span></div>
            <div className="title">{Book.title}</div>
            <div className="author">{Book.author}</div>
        </div>
    );
};

export default BookCard;