import React, { useEffect, useState } from "react";
import "./BrowseBooks.css";
import MainHeader from "../../HelperComponents/Header/MainHeader";
import { useFetchBooksData } from "../../CustomHooks/UseFetchBooksData";
import MainLoader from "../../HelperComponents/Loader/MainLoader";
import BookCard from "../../HelperComponents/Cards/BookCard";
import { useNavigate } from "react-router-dom";
import BackButton from "../../Assets/back-button.svg";

const BrowseBooks = () => {
    const [Books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { BooksData, Error } = useFetchBooksData();

    const Navigate = useNavigate();

    // Render the content
    useEffect(() => {
        if (Error) {
            console.error(Error);
        }

        if (BooksData.length > 0) {
            setBooks(BooksData);
            setIsLoading(false);
        }
    }, [BooksData, Error]);

    const HandleOnBackPress = () => {
        Navigate(-1);
    }

    return (
        <React.Fragment>
            <MainHeader />

            <button className="back-btn" type="button" onClick={HandleOnBackPress}>
                <img src={BackButton} alt="BackButton" />
            </button>

            <search className="search-section">

            </search>

            {
                isLoading ?
                    <MainLoader />
                    :
                    <div className="browse-books">
                        <section className="filter-section">

                        </section>

                        <div className="books-container">
                            {
                                Books.map((Book, Index) => {
                                    return (
                                        <BookCard key={Index} Book={Book} />
                                    )
                                })
                            }
                        </div>
                    </div>
            }
        </React.Fragment>
    );
};

export default BrowseBooks;