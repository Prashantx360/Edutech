import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const user_id = localStorage.getItem("user_id");
  const emp_type = localStorage.getItem("emp_type");
  const edit = [];
  if (user_id > 0) {
    edit.push(
      <>
        <li className="nav-item">
          <Link to="/Edit_Profile" className="nav-link text-white">
            <h4>Edit Profile</h4>
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link to="/Project_Details" className="nav-link text-white">
            <h4>Project Details</h4>
          </Link>
        </li> */}
      </>
    );
  }
  if (emp_type === "Manager") {
    edit.push(<li className="nav-item">
    <Link to="/Project_Details" className="nav-link text-white">
      <h4>Project Details</h4>
    </Link>
  </li>)
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary rounded-0 shadow">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active ">
              <a className="nav-link  text-white font-weight-bold" href="/">
                <h4>Home </h4>
                <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
          <ul className=" navbar-nav float-right">
            <li className="nav-item active">
              <Link
                to="/New_Login"
                className="nav-link text-white font-weight-bold"
              >
                <h4>Logout</h4>
              </Link>
            </li>
            {edit}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
