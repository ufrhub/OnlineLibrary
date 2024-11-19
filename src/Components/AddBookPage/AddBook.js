import React, { useCallback, useState } from "react";
import "./AddBook.css";
import MainHeader from "../../HelperComponents/Header/MainHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-regular-svg-icons";
import { Buffer } from "buffer";
import { useDispatch } from "react-redux";
import { AddNewBook } from "../../Redux/Actions/BookActions";
import { useNavigate } from "react-router-dom";
import NavigateBackStack from "../../HelperComponents/NavigateBack/NavigateBackStack";

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

    const HandleInputChange = useCallback(({ target: { name, value } }) => {
        setBook((PreviousBookDetails) => ({ ...PreviousBookDetails, [name]: value }));
    }, []);

    const HandleFileChange = useCallback(({ target: { name, files } }) => {
        const File = files[0];

        if (File) {
            if (File.size > 1 * 1024 * 1024) { // Limit to 1MB
                alert("File size exceeds 1MB");
                return;
            }

            const Reader = new FileReader();

            // Event Handler for when the file is read successfully
            Reader.onload = ({ target: { result: ArrayBuffer } }) => {
                const ConvertedBuffer = Buffer.from(ArrayBuffer).toString("base64");
                const FileData = JSON.stringify({
                    lastModified: File.lastModified,
                    lastModifiedDate: File.lastModifiedDate,
                    name: File.name,
                    size: File.size,
                    type: File.type,
                    buffer: ConvertedBuffer
                });

                setBook((PreviousBookDetails) => ({ ...PreviousBookDetails, [name]: FileData }));
            };

            // Read the file as an ArrayBuffer
            Reader.readAsArrayBuffer(File);
        }
    }, []);

    const HandleSubmit = useCallback((Event) => {
        Event.preventDefault();

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
    }, [Dispatch, Navigate, book]);

    return (
        <React.Fragment>
            <MainHeader style={{ margin: "0 0 5px" }} />

            <NavigateBackStack />

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