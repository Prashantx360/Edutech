import React, { useState, useEffect } from "react";
import Input from "./Input";
import axios from "axios";
import Header from "./Header";
import Multiselect from "multiselect-react-dropdown";
import { useLocation } from "react-router-dom";

const INITIAL_STATE = {
  projectName: "",
  companyName: "",
  company_phone: "",
  project_status: "",
  emp_ids: "",
  project_startdate: "",
  project_enddate: "",
};
export default function Edit_Project_Details() {
  const location = useLocation();
  const post_data = location.state;
  const [project, setProject] = useState(INITIAL_STATE);
  const [emp_ids, setEmpIds] = useState([]);
  const [users, setUser] = useState();

  useEffect(() => {
    loadUser();
    (async () => {
      try {
        const project = await axios.get(
          `http://localhost:3333/employees_project_details/${post_data}`
        );
        // console.log(project.data);
        setProject(project.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const loadUser = async () => {
    const user = await axios.get("http://localhost:3333/employees");
    setUser(user.data);
  };

  const handleInput = (e) => {
    // console.log(e.target.name, " : ", e.target.value);
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const options = () => {
    const opts = [];
    users?.map((usr, key) => {
      if (usr.type_of_emp === "Member") {
        const opt = { name: "EMP-" + usr.id, id: usr.id };
        opts.push(opt);
      }
    });

    return opts;
  };

  const onSelect = (selectedList, selectedItem) => {
    setEmpIds(selectedList);
    console.log(selectedItem.name, selectedList);
    console.log(emp_ids);
  };
  const onRemove = (selectedList, removedItem) => {
    setEmpIds(selectedList);
    console.log(removedItem, selectedList);
    console.log(emp_ids);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (emp_ids) {
        project['emp_ids'] = emp_ids;
        setProject(project);
      }
      const response = await axios.put(
        `http://localhost:3333/employees_project_details/${project.id}`,
        project
      );
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <Header />
      <div className="col-md-2"></div>
      <div className="col-md-6 jumbotron align-items-center shadow">
        <form onSubmit={handleSubmit}>
          <div className="form-group ">
            <label className="text-left">Project Name</label>
            <Input
              name="projectName"
              type="text"
              value={project.projectName}
              placeholder={"Your ProjectName"}
              handleInput={handleInput}
            />
          </div>

          <div className="form-group ">
            <label className="text-left">Company Name</label>
            <Input
              name="companyName"
              type="text"
              value={project.companyName}
              placeholder={"Your CompanyName"}
              handleInput={handleInput}
            />
          </div>
          <div className="form-group ">
            <label className="text-left">Project Status</label>
            <Input
              name="project_status"
              type="text"
              value={project.project_status}
              placeholder={"Your project Status"}
              handleInput={handleInput}
            />
          </div>

          <div className="form-group ">
            <label className="text-left">Company phoneNumber</label>
            <Input
              name="company_phone"
              type="text"
              value={project.company_phone}
              placeholder={"Your Company PhoneNumber"}
              handleInput={handleInput}
            />
          </div>
          <div className="form-group ">
            <label className="text-left">Employee Id</label>
            <Multiselect
              options={options()} // Options to display in the dropdown
              selectedValues={project.emp_ids} // Preselected value to persist in dropdown
              onSelect={onSelect} // Function will trigger on select event
              onRemove={onRemove} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
            />
          </div>
          <div className="form-group ">
            <label className="text-left">Project Start Date</label>
            <Input
              name="project_startdate"
              type="Date"
              value={project.project_startdate}
              placeholder={"Your Project Start Date"}
              handleInput={handleInput}
            />
          </div>
          <div className="form-group ">
            <label className="text-left">Project End Date</label>
            <Input
              name="project_enddate"
              type="Date"
              value={project.project_enddate}
              placeholder={"Your Project End Date"}
              handleInput={handleInput}
            />
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
