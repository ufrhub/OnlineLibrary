import React from "react";
import PropTypes from "prop-types";
import "./Card.css";
import { useNavigate } from "react-router-dom";

const BookCard = React.memo(({ Book }) => {
    const Navigate = useNavigate();

    const HandleNavigate = () => {
        Navigate(`/book-details/${Book?.id}`);
    }

    return (
        <div className="book-card" onClick={HandleNavigate}>
            <img src={Book?.image} alt="Book" />
            <div className="ratings-and-price"><span>{Book?.ratings}</span><span>${Book?.price}</span></div>
            <div className="title">{Book?.title}</div>
            <div className="author">{Book?.author}</div>
        </div>
    );
});

BookCard.propTypes = {
    Book: PropTypes.shape(
        {
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            ratings: PropTypes.oneOfType(
                [
                    PropTypes.string,
                    PropTypes.number
                ]
            ).isRequired,
            price: PropTypes.oneOfType(
                [
                    PropTypes.string,
                    PropTypes.number
                ]
            ).isRequired,
        }
    ).isRequired
};

export default BookCard;