import React, { useState, useCallback, useEffect } from "react";

const Products = () => {
  const [data, setData] = useState([]);
  const baseURL = "http://localhost:5000";

  const getItems = useCallback(async () => {
    const response = await fetch(`${baseURL}/api/items/allItems`);
    const json = await response.json();
    console.log(json);
    setData(json);
  }, []);

  useEffect(() => {
    getItems();
  }, [getItems]);

  return (
    <>
      {!localStorage.getItem("token") ? (
        <div
          className="mt-3 container alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>Sign Up First !</strong> To Make Purchase
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      ) : (
        ""
      )}

      {/* Loaded Data */}
      <div className="container mt-3">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
          {data.map((elem) => {
            // console.log(elem);
            return (
              <div className="col mb-4" key={elem.id}>
                <div className="card">
                  <img
                    style={{
                      width: "100%",
                      height: "200px",
                      overflow: "hidden",
                    }}
                    src={elem.imageURL}
                    className="card-img-top"
                    alt="will appear here"
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center mb-3">
                      {elem.title}
                    </h5>
                    <p className="card-text text-justify">{elem.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="card-text mb-0">
                        <strong>&#x20B9; {elem.price}</strong>
                      </p>

                      {localStorage.getItem("token") ? (
                        <p className="btn btn-primary">Buy Now</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Products;
