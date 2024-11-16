import React, { useEffect, useState } from "react";
import "./Home.css";
import MainHeader from "../../HelperComponents/Header/MainHeader";
import BookCard from "../../HelperComponents/Cards/BookCard";
import axios from "axios";
import { useSelector } from "react-redux";
import { Buffer } from "buffer";

const Home = () => {
    const BooksState = useSelector((state) => state.BookReducers);
    const [Books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const ExtractFileData = (Data) => {
        if (Data) {
            const imageFile = JSON.parse(Data);
            const bufferImage = Buffer.from(imageFile.buffer, "base64");

            return {
                imageFile,
                bufferImage
            }
        } else {
            return null;
        }
    }

    const ConverBufferIntoBase64 = (BufferData, Type) => {
        if (BufferData && Type) {
            // Convert Uint8Array to Base64
            let BinaryString = "";
            const uintArray = new Uint8Array(BufferData);

            // Use a loop to build the binary string
            for (let i = 0; i < uintArray.length; i++) {
                BinaryString += String.fromCharCode(uintArray[i]);
            }

            // Encode to Base64
            const Base64String = btoa(BinaryString);

            // Prepend the MIME type
            const DataUrl = `data:${Type};base64,${Base64String}`;
            return DataUrl;
        }
        return null;
    };

    useEffect(() => {
        if (BooksState.length > 0) {
            setIsLoading(true);
            const UpdatedBooks = BooksState.map((Element) => {
                const ExtractImage = ExtractFileData(Element?.image);
                const Image = ConverBufferIntoBase64(ExtractImage?.bufferImage, ExtractImage?.imageFile?.type);
                const ExtractCoverImge = ExtractFileData(Element?.coverImage);
                const CoverImage = ConverBufferIntoBase64(ExtractCoverImge?.bufferImage, ExtractCoverImge?.imageFile?.type);
                const ExtractBookFile = ExtractFileData(Element?.book);
                const BookFile = ConverBufferIntoBase64(ExtractBookFile?.bufferImage, ExtractBookFile?.imageFile?.type);

                return {
                    author: Element?.author,
                    title: Element?.title,
                    description: Element?.description,
                    price: Element?.price,
                    ratings: Element?.ratings,
                    reviews: Element?.reviews,
                    downloads: Element?.downloads,
                    pages: Element?.pages,
                    genres: Element?.genres,
                    language: Element?.language,
                    published: Element?.published,
                    image: Image,
                    coverImage: CoverImage,
                    book: BookFile,
                };
            });

            setBooks((prevBooks) => {
                const CombinedBooks = [...prevBooks, ...UpdatedBooks];

                const UniqueBooks = Array.from(new Map(CombinedBooks.map((book) => [book.title, book])).values());
                return UniqueBooks;
            });
            console.log(UpdatedBooks);
            setIsLoading(false);
        }
    }, [BooksState]);

    useEffect(() => {
        const FetchBooks = async () => {
            setIsLoading(true);
            const Response = await axios.get("https://dummyjson.com/c/9dda-8aac-4f2b-aef8");
            setBooks((prevBooks) => {
                const CombinedBooks = [...prevBooks, ...Response.data];

                const UniqueBooks = Array.from(new Map(CombinedBooks.map((book) => [book.title, book])).values());
                return UniqueBooks;
            });
            setIsLoading(false);
        };

        FetchBooks();
    }, []);

    useEffect(() => {
        console.log(Books);
    }, [Books]);

    return (
        <React.Fragment>
            <MainHeader />

            {
                isLoading ?
                    <></>
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