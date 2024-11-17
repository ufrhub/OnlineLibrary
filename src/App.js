import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/HomePage/Home";
import AddBook from "./Components/AddBookPage/AddBook";
import BookDetails from "./Components/BookDetailsPage/BookDetails";
import BrowseBooks from "./Components/BrowseBooksPage/BrowseBooks";

const App = () => {
  return (
    <Routes>
      <Route path="*" exact element={<Navigate to="/" />} />
      <Route path="/" exact element={<Home />} />
      <Route path="/browse-books" exact element={<BrowseBooks />} />
      <Route path="/book-details/:id" exact element={<BookDetails />} />
      <Route path="/add-book" exact element={<AddBook />} />
    </Routes>
  );
};

export default App;