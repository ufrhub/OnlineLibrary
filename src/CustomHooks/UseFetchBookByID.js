import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FetchBooksFromApi, TransformBookData } from "../Services/BookService";

export const useFetchBookByID = (BookID) => {
    const BooksState = useSelector((state) => state.BookReducers);
    const [BookData, setBookData] = useState();
    const [Error, setError] = useState(null);

    const FetchBooksFromRedux = useCallback(async () => {
        if (!Array.isArray(BooksState) || BooksState.length === 0) return [];

        try {
            const TransformedBookData = await Promise.all(
                BooksState.map((Book) => TransformBookData(Book))
            );

            return TransformedBookData;
        } catch (error) {
            console.error("Error transforming books from Redux:", error);
            return [];
        }
    }, [BooksState]);

    useEffect(() => {
        const FetchBooks = async () => {
            try {
                const BooksFromRedux = await FetchBooksFromRedux();
                const BooksFromApi = await FetchBooksFromApi();

                const CombinedBooks = Array.from(
                    new Map(
                        [...BooksFromRedux, ...BooksFromApi].map((Book) => [Book.id, Book])
                    ).values()
                );

                const FindBook = CombinedBooks.find((Book) => String(Book.id) === String(BookID));

                setBookData(FindBook);
            } catch (error) {
                setError(error.message || "An error occurred while fetching books");
            }
        };

        FetchBooks();
    }, [BookID, FetchBooksFromRedux]);

    return { BookData, Error };
}