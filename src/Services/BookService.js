import Axios from "axios";
import { ExtractFileData, ConvertBufferIntoBase64 } from "../Utilities/FileUtilities";

export const FetchBooksFromApi = async () => {
    try {
        const Response = await Axios.get("https://dummyjson.com/c/9dda-8aac-4f2b-aef8");
        return Response.data || [];
    } catch (error) {
        throw new Error(error.message || "Error fetching books from API");
    }
};

export const TransformBookData = async (BookData) => {
    if (!BookData || typeof BookData !== "object") {
        console.error("Invalid book:", BookData);
        throw new Error("Invalid book structure");
    }

    try {
        // Extract the image data and convert it to Base64
        const ExtractImage = ExtractFileData(BookData?.image);
        const Image = await ConvertBufferIntoBase64(ExtractImage?.BufferImage, ExtractImage?.ImageFile?.type);

        // Extract the cover image data and convert it to Base64
        const ExtractCoverImage = ExtractFileData(BookData?.coverImage);
        const CoverImage = await ConvertBufferIntoBase64(ExtractCoverImage?.BufferImage, ExtractCoverImage?.ImageFile?.type);

        // Extract the book file data and convert it to Base64
        const ExtractBookFile = ExtractFileData(BookData?.book);
        const BookFile = await ConvertBufferIntoBase64(ExtractBookFile?.BufferImage, ExtractBookFile?.ImageFile?.type);

        const TransformedBookData = {
            ...BookData,
            image: Image,
            coverImage: CoverImage,
            book: BookFile,
        };

        return TransformedBookData;
    } catch (error) {
        console.error("Error transforming book data:", error);
        throw error;
    }
};
