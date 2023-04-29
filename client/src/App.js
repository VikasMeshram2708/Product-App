import React from "react";
import Navbar from "./Components/Navbar";
import SignUp from "./Components/Forms/SignUp";
import SignIn from "./Components/Forms/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
// import Products from "./Components/Products";
import Holder from "./Components/Holder";
import Dashboard from "./Components/Dashboard";
import AllItems from "./Components/AllItems";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="*" element={<h1>Page Doesn't Exist</h1>} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/holder" element={<Holder />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="allItems" element={<AllItems />} />
        <Route path="/myItems" element={<Holder />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
