import React from "react";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Manager_Dashboard from "./Manager_Dashboard";

const Home = () => {
  const user_id = localStorage.getItem("user_id");
  const emp_type = localStorage.getItem("emp_type");
  if (user_id > 0) {
    if (emp_type === "Member") {
      return (<Dashboard />);
    }
    else {
      return (<Manager_Dashboard />);
    }
  } else {
    return (
      <div className="jumbotron jumbotron-fluid bg-white">
        <div className="container text-sm-center p-t-3">
          <h1 className="display-2">Employee Information</h1>

          <div className="btn-group">
            <button type="button" className="btn btn-primary">
              <Link to="/Registration" className="nav-link text-white">
                Register
              </Link>
            </button>
            <button type="button" className="btn btn-primary">
              {" "}
              <Link to="/New_Login" className="nav-link text-white">
                Login
              </Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
