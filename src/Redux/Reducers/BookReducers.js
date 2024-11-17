import { ADD_BOOK, UPDATE_BOOK, DELETE_BOOK } from "../Constants";

const InitialState = [];

const BookReducers = (State = InitialState, Actions) => {
    switch (Actions.type) {
        case ADD_BOOK:
            const BookExists = State.some((book) => book.id === Actions.payload.id);

            if (BookExists) {
                // Throw an error if the book already exists
                throw new Error(`Book with id ${Actions.payload.id} already exists.`);
            }

            return [...State, Actions.payload];

        case UPDATE_BOOK:
            return State.map((book) =>
                book.id === Actions.payload.id
                    ? { ...book, ...Actions.payload }
                    : book
            );

        case DELETE_BOOK:
            return State.filter((book) => book.id !== Actions.payload.id);

        default:
            return State;
    }
}

export default BookReducers;