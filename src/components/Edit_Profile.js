import React, { useState, useEffect, useRef } from "react";
import Input from "./Input";
import { TagsInput } from "react-tag-input-component";
import axios from "axios";
import Header from "./Header";

const INITIAL_STATE = {
  emp_id: "",
  firstName: "",
  middleName : "",
  lastName: "",
  email: "",
  password: "",
  birthdate: "",
  gender: "",
  address: "",
  marital_status: "",
  start_date: "",
  end_date: "",
  total_exp: "",
  type_of_emp: "",
  phone: "",
  post_code: "",
  qualification: "",
  designation: "",
  skills: "",
  id: 0,
};
export default function Edit_Profile() {
  const [user, setUser] = useState(INITIAL_STATE);
  const [skills, setSkills] = useState([]);
  const form = useRef("");
  useEffect(() => {
    (async () => {
      try {
        const user_id = localStorage.getItem("user_id");
        const user = await axios.get(
          `http://localhost:3333/employees/${user_id}`
        );
        console.log(user.data);
        setUser(user.data);
        if(user.data.skills) {
          user.data.skills?.map((val,key) => {skills[key] = val});
          // setSkills(skills)
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleInput = (e) => {
    // console.log([e.target.name], e.target.value)
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (skills) {
        // console.log("skills",skills)
        user['skills'] = skills;
        setUser(user);
        // console.log("users",user)
      }
      // console.log("Data for update : ", user);
      // const user_id = localStorage.getItem("user_id");
      const response = await axios.put(
        `http://localhost:3333/employees/${user.id}`,
        user
      );
      console.log("response", response);
      form.current.reset();
      setUser("")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container-fluid">
      <Header />
      <div className="text-center h2">Employee Profile</div>
      <div className="col-md-3"></div>
      <div className="col-md-6 jumbotron align-items-center shadow">
        <form ref={form} onSubmit={handleSubmit}>
          <div className="form-group col-md-4">
            <label>First Name</label>
            <Input
              name="firstName"
              type="text"
              value={user.firstName}
              placeholder={"Your first name"}
              handleInput={handleInput}
            />
          </div>
          <div className="form-group col-md-4">
            <label>Middle Name</label>
            <Input
              name="middleName"
              type="text"
              value={user.middleName}
              placeholder={"Your middle name"}
              handleInput={handleInput}
            />
          </div>
          <div className="form-group col-md-4">
            <label> Last Name</label>
            <Input
              type="text"
              name="lastName"
              value={user.lastName}
              placeholder={"Your last name"}
              handleInput={handleInput}
            />
          </div>
          <div className="form-group col-md-6">
            <label> Email</label>
            <Input
              type="email"
              name="email"
              value={user.email}
              placeholder={"Your email"}
              handleInput={handleInput}
            />
          </div>
          <div className="form-group col-md-6">
            <label> Password</label>
            <Input
              type="password"
              name="password"
              value={user.password}
              placeholder={"Your password"}
              handleInput={handleInput}
            />
          </div>
          <div className="form-group col-md-12">
            <label> Address</label>
            <Input
              type="text"
              name="address"
              value={user.address}
              placeholder={"Your Address"}
              handleInput={handleInput}
            />
          </div>
          <div className="form-group col-md-12">
            <label> Skills</label>
            <TagsInput
              value={skills}
              name="skills"
              placeholder={"Add skills"}
              onChange={setSkills}
            />
          </div>
          <div className="form-group col-md-4">
            <label> Phone number </label>
            <Input
              type="number"
              name="phone"
              value={user.phone}
              placeholder={"Your phone number"}
              handleInput={handleInput}
            />
          </div>
          <div className="form-group col-md-4">
            <label> Postal code</label>
            <Input
              type="number"
              name="post_code"
              value={user.post_code}
              placeholder={"Your postal code"}
              handleInput={handleInput}
            />
          </div>
          <div className="form-group col-md-4">
            <label> Total Experience</label>
            <Input
              type="number"
              name="total_exp"
              value={user.total_exp}
              placeholder={"Your total experience"}
              handleInput={handleInput}
            />
          </div>
          <div className="form-group col-md-4">
            <label> Qualification</label>
            <Input
              type="text"
              name="qualification"
              value={user.qualification}
              placeholder={"Your qualification"}
              handleInput={handleInput}
            />
          </div>
          <div className="form-group col-md-4">
            <label> Type Of Employee</label>
            <Input
              type="text"
              name="type_of_emp"
              value={user.type_of_emp}
              placeholder={"Member / Manager"}
              handleInput={handleInput}
            />
          </div>
          <div className="form-group col-md-4">
            <label> Designation</label>
            <Input
              type="text"
              name="designation"
              value={user.designation}
              placeholder={"Your designation"}
              handleInput={handleInput}
            />
          </div>
          <div className="form-group col-md-4">
            <label> Date of Birth</label>
            <Input
              type="date"
              name="birthdate"
              value={user.birthdate}
              placeholder={"Date of Birth"}
              handleInput={handleInput}
            />
          </div>
          <div className="form-group col-md-4">
            <label> Start Date</label>
            <Input
              type="date"
              name="start_date"
              value={user.start_date}
              placeholder={"Start Date"}
              handleInput={handleInput}
            />
          </div>
          <div className="form-group col-md-4">
            <label> End Date</label>
            <Input
              type="date"
              name="end_date"
              value={user.end_date}
              placeholder={"End Date"}
              handleInput={handleInput}
            />
          </div>
          <div className="form-group col-md-6">
            <label> Gender</label>
            <br></br>
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={user.gender === "male"}
              onChange={handleInput}
            />{" "}
            <label className="light" htmlFor="male">
              {" "}
              Male{" "}
            </label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={user.gender === "female"}
              onChange={handleInput}
            />{" "}
            <label className="light" htmlFor="female">
              {" "}
              Female{" "}
            </label>
            <input
              type="radio"
              id="other"
              name="gender"
              value="other"
              onChange={handleInput}
            />{" "}
            <label
              className="light"
              checked={user.gender === "other"}
              htmlFor="other"
            >
              {" "}
              Other{" "}
            </label>
          </div>
          <div className="form-group col-md-6">
            <label> Marital Status</label>
            <br></br>
            <input
              type="radio"
              id="married"
              name="marital_status"
              value="married"
              checked={user.marital_status === "married"}
              onChange={handleInput}
            />{" "}
            <label className="light" htmlFor="married">
              {" "}
              Married{" "}
            </label>
            <input
              type="radio"
              id="unmarried"
              name="marital_status"
              value="unmarried"
              checked={user.marital_status === "unmarried"}
              onChange={handleInput}
            />{" "}
            <label className="light" htmlFor="unmarried">
              {" "}
              Unmarried{" "}
            </label>
          </div>

          <div className="text-center">
            {" "}
            <button type="submit " className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
      <header></header>
    </div>
  );
}
