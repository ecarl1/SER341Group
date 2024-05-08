import React from "react";
import Table from "./table";
import NavBar from "./components/navBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./components/products";
import About from "./components/about";
import NotFound from "./components/notFound";
import ProductDetails from "./components/productDetails";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/ " element={<Table />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/products" element={<Products sortBy="name" />}></Route>
          <Route path="/products/:id" element={<ProductDetails />}></Route>

          <Route path="*" element={<NotFound />}></Route>
          <Route index element={<Table />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
