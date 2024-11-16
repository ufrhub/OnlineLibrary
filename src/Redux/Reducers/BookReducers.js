import { ADD_BOOK, UPDATE_BOOK, DELETE_BOOK } from "../Constants";

const InitialState = [];

const BookReducers = (State = InitialState, Actions) => {
    switch (Actions.type) {
        case ADD_BOOK:
            return [...State, Actions.payload];

        case UPDATE_BOOK:
            return State.map((book) =>
                book.title === Actions.payload.title
                    ? { ...book, ...Actions.payload }
                    : book
            );

        case DELETE_BOOK:
            return State.filter((book) => book.title !== Actions.payload.title);

        default:
            return State;
    }
}

export default BookReducers;