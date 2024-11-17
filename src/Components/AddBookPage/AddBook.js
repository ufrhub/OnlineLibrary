import React, { useState } from "react";
import "./AddBook.css";
import MainHeader from "../../HelperComponents/Header/MainHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-regular-svg-icons";
import { Buffer } from "buffer";
import { useDispatch } from "react-redux";
import { AddNewBook } from "../../Redux/Actions/BookActions";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
    const [book, setBook] = useState({
        id: Date.now(),
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
        coverImage: null,
        book: null
    });

    const Dispatch = useDispatch();
    const Navigate = useNavigate();

    const HandleInputChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const HandleFileChange = (event) => {
        const { name, files } = event.target;
        const file = files[0];

        if (file) {
            const reader = new FileReader();

            // Event Handler for when the file is read successfully
            reader.onload = (e) => {
                const arrayBuffer = e.target.result; // ArrayBuffer of the file
                const buffer = Buffer.from(arrayBuffer).toString('base64'); // Convert to Node.js Buffer
                const fileData = JSON.stringify({
                    lastModified: file.lastModified,
                    lastModifiedDate: file.lastModifiedDate,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    buffer
                });
                setBook({ ...book, [name]: fileData });
            };

            // Read the file as an ArrayBuffer
            reader.readAsArrayBuffer(file);
        }
    };

    const HandleSubmit = (e) => {
        e.preventDefault();

        // Convert genres from string to an array
        const FormattedBook = {
            ...book,
            genres: book.genres.split(',').map((genre) => genre.trim()),
        };

        try {
            Dispatch(AddNewBook(FormattedBook));
        } catch (error) {
            console.error(error.message);
            alert(error.message);
        }

        alert('Book details saved to localStorage!');
        Navigate("/");
    };

    return (
        <React.Fragment>
            <MainHeader />

            <div className="add-book">
                <form onSubmit={HandleSubmit}>
                    <div className="segment">
                        <h1>Add Book Details</h1>
                    </div>

                    <label>
                        <span>Author:</span>
                        <input type="text"
                            name="author"
                            value={book.author}
                            placeholder="Author"
                            onChange={HandleInputChange}
                            required
                        />
                    </label>

                    <label>
                        <span>Title:</span>
                        <input type="text"
                            name="title"
                            value={book.title}
                            placeholder="Title"
                            onChange={HandleInputChange}
                            required
                        />
                    </label>

                    <label>
                        <span>Description:</span>
                        <textarea type="text"
                            name="description"
                            value={book.description}
                            placeholder="Description"
                            onChange={HandleInputChange}
                        />
                    </label>

                    <label>
                        <span>Price:</span>
                        <input type="number"
                            name="price"
                            value={book.price}
                            placeholder="Price"
                            onChange={HandleInputChange}
                            required
                        />
                    </label>

                    <label>
                        <span>Ratings:</span>
                        <input type="number"
                            name="ratings"
                            value={book.ratings}
                            placeholder="Ratings"
                            onChange={HandleInputChange}
                        />
                    </label>

                    <label>
                        <span>Reviews:</span>
                        <input type="number"
                            name="reviews"
                            value={book.reviews}
                            placeholder="Reviews"
                            onChange={HandleInputChange}
                        />
                    </label>

                    <label>
                        <span>Downloads:</span>
                        <input type="number"
                            name="downloads"
                            value={book.downloads}
                            placeholder="Downloads"
                            onChange={HandleInputChange}
                        />
                    </label>

                    <label>
                        <span>Pages:</span>
                        <input type="number"
                            name="pages"
                            value={book.pages}
                            placeholder="Pages"
                            onChange={HandleInputChange}
                        />
                    </label>

                    <label>
                        <span>Genres (comma-separated):</span>
                        <input type="text"
                            name="genres"
                            value={book.genres}
                            placeholder="Genres"
                            onChange={HandleInputChange}
                        />
                    </label>

                    <label>
                        <span>Language:</span>
                        <input type="text"
                            name="language"
                            value={book.language}
                            placeholder="Language"
                            onChange={HandleInputChange}
                            required
                        />
                    </label>

                    <label>
                        <span>Published Date:</span>
                        <input type="date"
                            name="published"
                            value={book.published}
                            placeholder="Published Date"
                            onChange={HandleInputChange}
                            required
                        />
                    </label>

                    <label>
                        <span>Image:</span>
                        <input type="file"
                            name="image"
                            accept="image/*"
                            placeholder="Image"
                            onChange={HandleFileChange}
                            required
                        />
                    </label>

                    <label>
                        <span>Cover Image:</span>
                        <input type="file"
                            name="coverImage"
                            accept="image/*"
                            placeholder="Cover Image"
                            onChange={HandleFileChange}
                        />
                    </label>

                    <label>
                        <span>Book (PDF file):</span>
                        <input type="file"
                            name="book"
                            accept="application/pdf"
                            placeholder="Book (PDF file)"
                            onChange={HandleFileChange}
                        />
                    </label>

                    <button type="submit" className="submit-btn"><FontAwesomeIcon icon={faSave} bounce className="faSave" /> Save Book</button>
                </form>
            </div>
        </React.Fragment>
    );
};

export default AddBook;