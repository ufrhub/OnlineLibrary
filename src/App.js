import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLoader from "./HelperComponents/Loader/MainLoader";

const Home = React.lazy(() => import("./Components/HomePage/Home"));
const AddBook = React.lazy(() => import("./Components/AddBookPage/AddBook"));
const BookDetails = React.lazy(() => import("./Components/BookDetailsPage/BookDetails"));
const BrowseBooks = React.lazy(() => import("./Components/BrowseBooksPage/BrowseBooks"));
const NotFound = React.lazy(() => import("./Components/NotFoundPage/NotFound"));

const App = () => {
  return (
    <Suspense fallback={<MainLoader />}>
      <Routes>
        <Route path="*" exact element={<NotFound />} />
        <Route path="/" exact element={<Home />} />
        <Route path="/browse-books" exact element={<BrowseBooks />} />
        <Route path="/book-details/:id" exact element={<BookDetails />} />
        <Route path="/add-book" exact element={<AddBook />} />
      </Routes>
    </Suspense>
  );
};

export default App;