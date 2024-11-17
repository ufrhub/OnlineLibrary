import { Buffer } from "buffer";

export const ExtractFileData = (Data) => {
    if (!Data) return null;

    try {
        const ImageFile = JSON.parse(Data);

        if (!ImageFile.buffer) {
            throw new Error("No buffer found in the data");
        }

        const BufferImage = Buffer.from(ImageFile.buffer, "base64");

        return { ImageFile, BufferImage };
    } catch (error) {
        console.error("Error parsing or processing file data:", error);
        return null;
    }
};

export const ConvertBufferIntoBase64 = (BufferData, Type) => {
    // Return null if BufferData or Type is not provided
    if (!BufferData || !Type) return null;

    // Ensure that BufferData is an instance of Uint8Array (binary data)
    if (!(BufferData instanceof Uint8Array)) {
        throw new Error('Expected BufferData to be a Uint8Array');
    }

    // Create a Blob object from the binary data and MIME type
    const BlobData = new Blob([BufferData], { type: Type });

    // Create a FileReader instance to read the Blob data
    const Reader = new FileReader();

    // Return a promise that resolves with the Base64 Data URL
    return new Promise((Resolve, Reject) => {
        // Handle the completion of the FileReader process
        Reader.onloadend = () => {
            // Extract the Base64 string from the data URL
            const Base64String = Reader.result.split(",")[1]; // Extract Base64 from the data URL

            // Construct the final Data URL with the MIME type and Base64 data
            const DataUrl = `data:${Type};base64,${Base64String}`;

            // Resolve the promise with the Data URL
            Resolve(DataUrl);
        };

        // Reject the promise in case of an error
        Reader.onerror = Reject;

        // Start reading the Blob as a Data URL (Base64 encoded)
        Reader.readAsDataURL(BlobData);
    });
};
