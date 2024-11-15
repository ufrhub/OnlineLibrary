import React, { useState } from "react";
import "./AddBook.css";
import MainHeader from "../../HelperComponents/Header/MainHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-regular-svg-icons";

const AddBook = () => {
    const [book, setBook] = useState({
        author: '',
        title: '',
        description: '',
        price: '',
        ratings: '',
        reviews: '',
        downloads: '',
        pages: '',
        genres: '',
        language: '',
        published: '',
        image: null,
        coverImage: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setBook({ ...book, [name]: files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Convert genres from string to an array
        const formattedBook = {
            ...book,
            genres: book.genres.split(',').map((genre) => genre.trim()),
        };

        // Save the book object to localStorage
        localStorage.setItem('bookData', JSON.stringify(formattedBook));
        alert('Book details saved to localStorage!');
    };

    return (
        <React.Fragment>
            <MainHeader />

            <div className="add-book">
                <form onSubmit={handleSubmit}>
                    <div className="segment">
                        <h1>Add Book Details</h1>
                    </div>

                    <label>
                        <span>Author:</span>
                        <input type="text"
                            name="author"
                            value={book.author}
                            placeholder="Author"
                            onChange={handleInputChange}
                            required
                        />
                    </label>

                    <label>
                        <span>Title:</span>
                        <input type="text"
                            name="title"
                            value={book.title}
                            placeholder="Title"
                            onChange={handleInputChange}
                            required
                        />
                    </label>

                    <label>
                        <span>Description:</span>
                        <textarea type="text"
                            name="description"
                            value={book.description}
                            placeholder="Description"
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>
                        <span>Price:</span>
                        <input type="number"
                            name="price"
                            value={book.price}
                            placeholder="Price"
                            onChange={handleInputChange}
                            required
                        />
                    </label>

                    <label>
                        <span>Ratings:</span>
                        <input type="number"
                            name="ratings"
                            value={book.ratings}
                            placeholder="Ratings"
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>
                        <span>Reviews:</span>
                        <input type="number"
                            name="reviews"
                            value={book.reviews}
                            placeholder="Reviews"
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>
                        <span>Downloads:</span>
                        <input type="number"
                            name="downloads"
                            value={book.downloads}
                            placeholder="Downloads"
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>
                        <span>Pages:</span>
                        <input type="number"
                            name="pages"
                            value={book.pages}
                            placeholder="Pages"
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>
                        <span>Genres (comma-separated):</span>
                        <input type="text"
                            name="genres"
                            value={book.genres}
                            placeholder="Genres"
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>
                        <span>Language:</span>
                        <input type="text"
                            name="language"
                            value={book.language}
                            placeholder="Language"
                            onChange={handleInputChange}
                            required
                        />
                    </label>

                    <label>
                        <span>Published Date:</span>
                        <input type="date"
                            name="published"
                            value={book.published}
                            placeholder="Published Date"
                            onChange={handleInputChange}
                            required
                        />
                    </label>

                    <label>
                        <span>Image:</span>
                        <input type="file"
                            name="image"
                            accept="image/*"
                            placeholder="Image"
                            onChange={handleFileChange}
                            required
                        />
                    </label>

                    <label>
                        <span>Cover Image:</span>
                        <input type="file"
                            name="coverImage"
                            accept="image/*"
                            placeholder="Cover Image"
                            onChange={handleFileChange}
                        />
                    </label>

                    <button type="submit" className="submit-btn"><FontAwesomeIcon icon={faSave} bounce className="faSave"/> Save Book</button>
                </form>
            </div>
        </React.Fragment>
    );
};

export default AddBook;