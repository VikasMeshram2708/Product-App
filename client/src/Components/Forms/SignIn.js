import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const baseURI = "http://localhost:5000";

  const handleForm = useCallback(
    async (event) => {
      event.preventDefault();
      if (!email.trim()) return;
      if (!password.trim()) return;
      const data = {
        email,
        password,
      };
      console.log(data);
      setEmail("");
      setPassword("");
      const response = await fetch(`${baseURI}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      console.log(json);

      const { authToken } = json;
      console.log(authToken);

      if (response.status === 422) {
        swal({
          title: "Email or Password didn't matched",
          icon: "error",
        });
      }

      if (response.status === 201) {
        swal({
          title: "User Registered Successfully",
          icon: "success",
        });
        localStorage.setItem("token", authToken);
        setTimeout(() => {
          navigate("/myItems");
        }, 1000);
      }

      if (response.status === 500) {
        swal({
          title: "Internal server error",
          icon: "error",
        });
      }
    },
    [email, password, navigate]
  );
  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign In
                      </p>

                      <form className="mx-1 mx-md-4" onSubmit={handleForm}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              value={email}
                              onChange={(event) => setEmail(event.target.value)}
                              required
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              Your Email
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                              value={password}
                              onChange={(event) =>
                                setPassword(event.target.value)
                              }
                              required
                              minLength={5}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Password
                            </label>
                          </div>
                        </div>

                        <div className="container">
                          <Link to="/signup">New User</Link>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://is.gd/DnrGPZ"
                        className="img-fluid"
                        alt="Sample"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
