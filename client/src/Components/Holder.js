import React, { useEffect, useState } from "react";
import Products from "./Products";
import Items from "./Forms/Items";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Holder = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const baseURL = "http://localhost:5001";

  const getUserProducts = async () => {
    const response = await fetch(`${baseURL}/api/products/myProducts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json);
    setDetails(json.message);
    // setName(json.message.name);
    // setEmail(json.message.email);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    getUserProducts();
  }, [navigate]);

  return (
    <>
      <Items />
      {!details.length < 1 ? (
        <div className="container">
          <p
            style={{ fontWeight: "bolder" }}
            className="container text-center p-3 bg-dark text-white rounded"
          >
            My Products
          </p>
        </div>
      ) : (
        ""
      )}

      {/* personal products will appear here */}
      <div className="container mb-2">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {details.map((elem) => {
            return (
              <div className="col" key={elem._id}>
                <div className="card">
                  <img
                    style={{
                      width: "100%",
                      height: "200px",
                      overflow: "hidden",
                    }}
                    src={elem.image}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{elem.name}</h5>
                    <p className="card-text">{elem.description}</p>
                    <button
                      className="btn btn-outline-danger"
                      onClick={async () => {
                        const response = await fetch(
                          `${baseURL}/api/products/deleteProduct/${elem._id}`,
                          {
                            method: "DELETE",
                            headers: {
                              "Content-Type": "application/json",
                              token: localStorage.getItem("token"),
                            },
                          }
                        );
                        const json = await response.json();
                        console.log(json);
                        // alert(json);
                        if (response.status === 201) {
                          swal({
                            title: "Item was Successfully Deleted",
                            icon: "success",
                          });
                          setTimeout(() => {
                            window.location.reload();
                          }, 1000);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Products />
      {/* modal here */}
      {/* to add new products */}
    </>
  );
};

export default Holder;
