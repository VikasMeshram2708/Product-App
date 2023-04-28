import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            {props.title}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {localStorage.getItem("token") ? (
                <li className="nav-item active">
                  <Link className="nav-link" to="/myItems">
                    My Items
                  </Link>
                </li>
              ) : (
                ""
              )}
              {localStorage.getItem("token") ? (
                <li className="nav-item active">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            <form className="d-flex" role="search">
              {!localStorage.getItem("token") ? (
                <div>
                  <Link to="/signup">
                    <button
                      className="btn btn-outline-success mx-2"
                      type="submit"
                    >
                      Sign UP
                    </button>
                  </Link>
                  <Link to="/signin">
                    <button className="btn btn-primary" type="submit">
                      Sign In
                    </button>
                  </Link>
                </div>
              ) : (
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

Navbar.defaultProps = {
  title: document.title,
};

export default Navbar;
