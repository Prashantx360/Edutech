import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Multiselect from "multiselect-react-dropdown";

const Project_Details = () => {
  const [projectName, setProjectName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [company_phone, setCompanyPhone] = useState("");
  const [project_status, setProjectStatus] = useState("");
  const [project_startdate, setProjectStartDate] = useState("");
  const [project_enddate, setProjectEndDate] = useState("");
  // const [emp_id, setEmpId] = useState("");
  const [emp_ids, setEmpIds] = useState([]);
  const [users, setUser] = useState();

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const checkProject = (serverProjects, project) => {
    const projects = serverProjects.find(
      (projects) => projects.projectName === project
    );
    if (projects) return projects;
  };

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const user = await axios.get("http://localhost:3333/employees");
    setUser(user.data);
  };

  const project_postData = async (e) => {
    e.preventDefault();

    const projects = await axios
      .get("http://localhost:3333/employees_project_details")
      .then((res) => checkProject(res.data, projectName));

    if (projects) {
      alert("Project name already exists");
      return false;
    }

    if (
      projectName === "" ||
      companyName === "" ||
      company_phone === "" ||
      // emp_id === "" ||
      project_status === "" ||
      project_startdate === "" ||
      project_enddate === ""
    ) {
      e.preventDefault();
      setError(true);
      return false;
    } else {
      setSubmitted(true);
      setError(false);
    }

    await axios.post(`http://localhost:3333/employees_project_details`, {
      projectName,
      companyName,
      company_phone,
      project_status,
      emp_ids,
      project_startdate,
      project_enddate,
    });
    setProjectName("");
    setCompanyName("");
    setEmpIds("");
    setCompanyPhone("");
    setProjectStatus("");
    setProjectStartDate("");
    setProjectEndDate("");
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h3 className="text-center text-success">
          Your Project {projectName} details successfully added!!
        </h3>
      </div>
    );
  };

  const options = () => {
    const opts = [];
    users?.map((usr,key) => {
      if (usr.type_of_emp === 'Member') {
        const opt = {'name': 'EMP-'+usr.id, 'id': usr.id}
        opts.push(opt);
      }
    });
    
    return opts;
  }

  const onSelect = (selectedList, selectedItem) =>{
    setEmpIds(selectedList)
    console.log(selectedItem.name,selectedList)
    console.log(emp_ids)
  }
  // Showing error message if error is true
  const errorMessage = () => {
    const msg = [];
    if (projectName === "") {
      msg.push(<p>Please enter project name</p>);
    }
    if (companyName === "") {
      msg.push(<p>Please enter company name</p>);
    }
    if (company_phone === "") {
      msg.push(<p>Please enter company phone number</p>);
    }
    if (project_status === "") {
      msg.push(<p>Please enter project status</p>);
    }
    if (project_startdate === "") {
      msg.push(<p>Please enter project start date</p>);
    }
    if (project_enddate === "") {
      msg.push(<p>Please enter project end date</p>);
    }

    if (
      projectName === "" &&
      companyName === "" &&
      project_status === "" &&
      project_startdate === "" &&
      project_enddate === "" &&
      company_phone === ""
    ) {
      msg.push(<p>Please enter all the details</p>);
    }

    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h4 className="text-center text-danger">{msg}</h4>
      </div>
    );
  };

  return (
    <div className="container-fluid">
      <Header />
      <div className="text-center h2">Project Details Form</div>
      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
      <div className="col-md-3"></div>
      <div className="col-md-6 jumbotron align-items-center shadow">
        <form onSubmit={project_postData}>
          <div className="form-group ">
            <label> Project Name</label>
            <input
              type="text"
              className="form-control"
              name="projectName"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          <div className="form-group ">
            <label> Company Name</label>
            <input
              type="text"
              className="form-control"
              name="companyName"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label> Project Status</label>
            <input
              type="text"
              className="form-control"
              name="project_status"
              placeholder="Project status"
              value={project_status}
              onChange={(e) => setProjectStatus(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label> Company Phone</label>
            <input
              type="number"
              className="form-control"
              name="company_phone"
              placeholder="Company Phone"
              maxLength={10}
              value={company_phone}
              onChange={(e) => setCompanyPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label> Employee Id</label>
            {/* <input
              type="number"
              className="form-control"
              name="emp_id"
              value={emp_id}
              onChange={(e) => setEmpId("EMP-" + e.target.value)}
            /> */}

            <Multiselect
              options={options()} // Options to display in the dropdown
              // selectedValues={emp_ids} // Preselected value to persist in dropdown
              onSelect={onSelect} // Function will trigger on select event
              // onRemove={onRemove} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
            />
          </div>
          <div className="form-group">
            <label> Project Start Date</label>
            <input
              type="date"
              className="form-control"
              name="project_startdate"
              value={project_startdate}
              onChange={(e) => setProjectStartDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label> Project End Date</label>
            <input
              type="date"
              className="form-control"
              name="project_enddate"
              value={project_enddate}
              onChange={(e) => setProjectEndDate(e.target.value)}
            />
          </div>

          <div className="text-center">
            <button type="submit " className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Project_Details;
