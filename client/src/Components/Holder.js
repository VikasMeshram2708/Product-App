import React, { useEffect } from "react";
import Products from "./Products";
import Items from "./Forms/Items";
import { useNavigate } from "react-router-dom";

const Holder = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Items />
      <Products />
      {/* modal here */}
      {/* to add new products */}
    </>
  );
};

export default Holder;
