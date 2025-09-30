import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
    // console.log("done");
    alert("Logout succesful");
    sessionStorage.removeItem("token");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
              {/* <Link className="nav-link" to="/about">
                About
              </Link> */}
              {!sessionStorage.getItem("token") ? (
                <>
                  <Link className="nav-link" to="/login">
                    login
                  </Link>
                  <Link className="nav-link " to="/signup" tabIndex="-1">
                    Signup
                  </Link>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-ghost "
                    onClick={handleLogout}
                    tabIndex="-1"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
