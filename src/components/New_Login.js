import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "./Header";

const New_Login = () => {
  const navigate = useNavigate();
  const [users, setUser] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  localStorage.removeItem('user_id')
  localStorage.removeItem('emp_type')
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get("http://localhost:3333/employees");

    setUser(result.data);
  };

  const loginHandler = (e) => {
    users.map((user, key) => {
      if (users[key].email === email && users[key].password === password) {
        console.log("user",users[key].id,email);
        localStorage.removeItem('user_id')
        localStorage.setItem('user_id', users[key].id);
        localStorage.setItem('emp_type', users[key].type_of_emp);

        if (users[key].type_of_emp === "Member") {
          navigate("/Dashboard");
        }
        else {
          navigate("/Manager_dashboard");
        }
        
      } else {
        // alert("fail");
        e.preventDefault();
        setErrMsg(true);
        return false;
      }
    });
  };

  // Showing error message if error is true
  const errorMessage = () => {
    let email_err = "";
    let pwd_err = "";
    let msg = "";

    if (
      email === "" ||
      /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g.test(email) === false
    ) {
      email_err = "Please enter correct email address ";
    }
    if (password === "") {
      pwd_err = "Please enter password ";
    }

    if (email !== "" && password !== "") {
      msg = "Incorrect login credentials";
    }

    return (
      <div
        className="error"
        style={{
          display: errMsg ? "" : "none",
        }}
      >
        <div className="text-center text-danger ">
          <p>{email_err}</p>
          <p>{pwd_err}</p>
          <p>{msg}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid">
      <Header />
      <div className="text-center h2">Login</div>
      <div className="messages">{errorMessage()}</div>
      <div className="col-md-4"></div>
      <div className="col-md-4 jumbotron align-items-center  shadow">
        <form>
          <div className="form-group ">
            <label> Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label> Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="text-center">
            <button
              className="btn btn-primary text-center"
              onClick={loginHandler}
            >
              LOGIN
            </button>
          </div>
          <div className="text-center p-4">
           
            Not a member?
           
              <Link to="/Registration" className="nav-link">
                Register
              </Link>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default New_Login;
