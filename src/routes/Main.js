import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Invoice from "../components/Invoice";

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Invoice />} />
        <Route path="/:id" element={<Invoice />} />
        <Route path="/edit/:id" element={<Invoice />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
