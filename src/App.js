import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/HomePage/Home";
import AddBook from "./Components/AddBookPage/AddBook";

const App = () => {
  return (
    <Routes>
      <Route path="*" exact element={<Navigate to="/" />} />
      <Route path="/" exact element={<Home />} />
      <Route path="/addBook" exact element={<AddBook />} />
    </Routes>
  );
};

export default App;