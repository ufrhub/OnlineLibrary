import { ADD_BOOK, UPDATE_BOOK, DELETE_BOOK } from "../Constants";

export const AddNewBook = (Payload) => {
    return {
        type: ADD_BOOK,
        payload: Payload
    }
}

export const UpdateBook = (Payload) => {
    return {
        type: UPDATE_BOOK,
        payload: Payload
    }
}

export const DeleteBook = (Payload) => {
    return {
        type: DELETE_BOOK,
        payload: Payload.id
    }
}