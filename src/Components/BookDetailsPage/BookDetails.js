import React, { useEffect, useState } from "react";
import "./BookDetails.css";
import MainHeader from "../../HelperComponents/Header/MainHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchBookByID } from "../../CustomHooks/UseFetchBookByID";
import MainLoader from "../../HelperComponents/Loader/MainLoader";
import BackButton from "../../Assets/back-button.svg";

const BookDetails = () => {
    const Params = useParams();
    const { BookData, Error } = useFetchBookByID(Params.id);
    const [Book, setBook] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const Navigate = useNavigate();

    useEffect(() => {
        if (Error) {
            console.error(Error);
        }

        if (BookData) {
            setBook(BookData);
            setIsLoading(false);
        }
    }, [BookData, Error]);

    const HandleOnBackPress = () => {
        Navigate(-1);
    }

    return (
        <React.Fragment>
            <MainHeader style={{ margin: "0 0 5px" }} />

            <button className="back-btn" type="button" onClick={HandleOnBackPress}>
                <img src={BackButton} alt="BackButton" />
            </button>

            {
                isLoading ?
                    <MainLoader />
                    :
                    <div className="book-details">

                        <section className="image-section">
                            <img src={Book.image} alt="Book" />
                        </section>

                        <section className="details-section">
                            <h1>{Book.title}</h1>

                            <div>
                                <h3>Author: <span>{Book.author}</span></h3>
                                <h3>Downloads: <span>{Book.downloads}</span></h3>
                                <h3>Genres:
                                    {
                                        Book.genres.map((genre, index) => (
                                            <span key={index}>{genre} {Book.genres.length !== index + 1 ? "," : ""}</span>
                                        ))
                                    }
                                </h3>
                                <h3>Pages: <span>{Book.pages}</span></h3>
                                <h3>Price: <span>${Book.price}</span></h3>
                                <h3>Ratings: <span>{Book.ratings}</span></h3>
                                <h3>Reviews: <span>{Book.reviews}</span></h3>
                                <h3>Language: <span>{Book.language}</span></h3>
                                <h3>published: <span>{Book.published}</span></h3>
                            </div>

                            <p>{Book.description}</p>
                        </section>
                    </div>
            }

        </React.Fragment>
    );
};

export default BookDetails;