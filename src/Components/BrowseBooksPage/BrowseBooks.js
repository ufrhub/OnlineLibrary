import React, { useEffect, useState } from "react";
import "./BrowseBooks.css";
import MainHeader from "../../HelperComponents/Header/MainHeader";
import { useFetchBooksData } from "../../CustomHooks/UseFetchBooksData";
import MainLoader from "../../HelperComponents/Loader/MainLoader";
import BookCard from "../../HelperComponents/Cards/BookCard";
import { useNavigate } from "react-router-dom";
import BackButton from "../../Assets/back-button.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const BrowseBooks = () => {
    const [Books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { BooksData, Error } = useFetchBooksData();

    const Navigate = useNavigate();

    const Categories = [
        "All", "Adventure", "Autobiography", "Biography", "Business and Economics",
        "Children's Fiction", "Cookbooks", "Crime Fiction", "Drama", "Dystopian",
        "Epistolary", "Fable", "Fairy Tale", "Fantasy", "Graphic Novels", "Health and Wellness",
        "Historical Fiction", "History", "Horror", "Magical Realism", "Memoir",
        "Mystery", "Philosophy", "Poetry", "Politics", "Religion and Spirituality",
        "Romance", "Satire", "Science and Nature", "Science Fiction", "Self-Help",
        "Thriller", "Travel", "True Crime", "Urban Fantasy", "Western", "Young Adult"
    ];

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
            <MainHeader style={{ marginTop: "0px" }} />

            {
                isLoading ?
                    <MainLoader />
                    :
                    <div className="browse-books">
                        <div className="top">
                            <button className="back-btn" type="button" onClick={HandleOnBackPress}>
                                <img src={BackButton} alt="BackButton" />
                            </button>

                            <form className="form">
                                <input type="text" name="searchText" placeholder="Type Book Title or Author" />
                                <button type="button" className="search-btn"><FontAwesomeIcon icon={faSearch} bounce className="faSearch" />Search</button>
                            </form>
                        </div>


                        <div className="bottom">
                            <section className="filter-section">
                                <form>
                                    <div className="segment">
                                        <h1>Filter</h1>
                                    </div>

                                    <label>
                                        <span>Select Category:</span>
                                        <select>
                                            {
                                                Categories.map((category, index) => (
                                                    <option key={index}>{category}</option>
                                                ))
                                            }
                                        </select>
                                    </label>
                                </form>
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
                    </div>
            }
        </React.Fragment>
    );
};

export default BrowseBooks;