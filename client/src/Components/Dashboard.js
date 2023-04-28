import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Dashboard = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState([]);

  const [bio, setBio] = useState([]);
  const baseURL = "http://localhost:5000";

  //   user details api
  const getUserProfile = async () => {
    const response = await fetch(`${baseURL}/api/auth/getUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json);
    setBio(json);
    setName(json.message.name);
    setEmail(json.message.email);
  };
  //   console.log("bio", bio);

  // user products api
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
  console.log("products", details);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    getUserProducts();
    getUserProfile();
  }, [navigate]);
  return (
    <>
      <section className="h-100 gradient-custom-2">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card">
                <div
                  className="rounded-top text-white d-flex flex-row"
                  style={{ backgroundColor: "#000", height: "200px" }}
                >
                  <div
                    className="ms-4 mt-5 d-flex flex-column"
                    style={{ width: "150px" }}
                  >
                    <img
                      src="https://is.gd/iLVoBN"
                      alt="Generic placeholder"
                      className="img-fluid img-thumbnail mt-4 mb-2"
                      style={{ width: "150px", zIndex: " 1" }}
                    />
                  </div>
                  <div className="ms-3" style={{ marginTop: " 130px" }}>
                    <h5>{name}</h5>
                    <p>{email}</p>
                  </div>
                </div>

                {/* products cards */}
                <div className="container mt-3">
                  {!details.length < 1 ? (
                    <p className="fs-3">Recent Products</p>
                  ) : (
                    ""
                  )}
                </div>
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
                                    window.location.reload();
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
                {/* <div className="container mt-3">
                  <div className="row">
                    {details.map((currElem) => {
                      return (
                        <div
                          className="col-lg-4 col-md-6 mb-4"
                          key={currElem.id}
                        >
                          <div className="card">
                            <img
                              style={{
                                width: "100%",
                                height: "200px",
                                overflow: "hidden",
                              }}
                              src={currElem.image}
                              className="card-img-top"
                              alt="will appear here..."
                            />
                            <div className="card-body">
                              <h5 className="card-title text-center mb-3">
                                {currElem.name}
                              </h5>
                              <p className="card-text text-justify">
                                {currElem.description}
                              </p>
                              <div className="d-flex justify-content-between align-items-center">
                                <p className="card-text mb-0">
                                  <strong>&#x20B9; {currElem.price}</strong>
                                </p>
                                <p className="btn btn-outline-danger">Delete</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
