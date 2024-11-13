import React, { useEffect, useState } from "react";
import "./Home.css";
import MainHeader from "../../HelperComponents/Header/MainHeader";
import BookCard from "../../HelperComponents/Cards/BookCard";
import axios from "axios";

const Home = () => {
    const [Books, setBooks] = useState([]);

    useEffect(() => {
        console.log("useEffect called");
        const FetchBooks = async () => {
            const Response = await axios.get("https://dummyjson.com/c/9dda-8aac-4f2b-aef8");
            setBooks(Response.data);
        };

        FetchBooks();
    }, []);

    return (
        <React.Fragment>
            <MainHeader />

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
        </React.Fragment>
    );
};

export default Home;