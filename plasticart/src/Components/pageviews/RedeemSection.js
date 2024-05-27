// import "./App.css";
import Nav from "../Nav/Nav";
import Products from "../Products/Products";
import { Route, Routes } from "react-router-dom";
function RedeemSection() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Products />} />
      </Routes>
    </div>
  );
}

export default RedeemSection;
