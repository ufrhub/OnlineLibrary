import React, { useEffect, useState } from "react";
import "./Home.css";
import MainHeader from "../../HelperComponents/Header/MainHeader";
import BookCard from "../../HelperComponents/Cards/BookCard";
import MainLoader from "../../HelperComponents/Loader/MainLoader";
import { useFetchBooksData } from "../../CustomHooks/UseFetchBooksData";

const Home = () => {
    const [Books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { BooksData, Error } = useFetchBooksData();

    // Render the content
    useEffect(() => {
        if (Error) {
            console.error(Error);
            setIsLoading(false);
            return;
        }

        if (BooksData.length > 0) {
            setBooks(BooksData);
            setIsLoading(false);
        }
    }, [BooksData, Error]);

    return (
        <React.Fragment>
            <MainHeader />

            {
                isLoading ?
                    <MainLoader />
                    :
                    <div className="home">
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

export default Home;