import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/HomePage/Home";

const App = () => {
  return (
    <Routes>
      <Route path="*" exact element={<Navigate to="/" />} />
      <Route path="/" exact element={<Home />} />
    </Routes>
  );
};

export default App;