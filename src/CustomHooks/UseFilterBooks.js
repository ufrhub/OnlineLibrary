import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FetchBooksFromApi, TransformBookData } from "../Services/BookService";

export const useFilterBooks = (Properties) => {
    const BooksState = useSelector((state) => state.BookReducers);
    const [FilteredBooks, setFilteredBooks] = useState([]);
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

                if (!Properties || (Properties.searchInput === "" && Properties.category === "")) {
                    setFilteredBooks(CombinedBooks);
                } else {
                    const FilterBooks = CombinedBooks.filter((Book) => {
                        return (
                            Book.title.toLowerCase() === Properties.searchInput.toLowerCase() ||
                            Book.author.toLowerCase() === Properties.searchInput.toLowerCase() ||
                            Book.genres.some((genre) => genre.toLowerCase() === Properties.category.toLowerCase())
                        );
                    });

                    setFilteredBooks(FilterBooks);
                }
            } catch (error) {
                setError(error.message || "An error occurred while fetching books");
            }
        };

        FetchBooks();
    }, [FetchBooksFromRedux, Properties]);

    return { FilteredBooks, Error };
};
