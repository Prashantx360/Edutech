import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { Link } from "react-router-dom";

const INITIAL_STATE = {
  emp_id: "",
  firstName: "",
  lastName: "",
  email: "",
  designation: "",
  type_of_emp: "",
};

const Manager_Dashboard = () => {
  const [projects, setProject] = useState([]);
  const [user, setUser] = useState(INITIAL_STATE);
  // const user_id = "EMP-" + localStorage.getItem("user_id");
  useEffect(() => {
    loadProject();
    loadUser();
  }, []);

  const loadProject = async () => {
    const projects = await axios.get(
      "http://localhost:3333/employees_project_details"
    );

    setProject(projects.data);
  };

  const loadUser = async () => {
    const user_id = localStorage.getItem("user_id");
    const user = await axios.get(`http://localhost:3333/employees/${user_id}`);

    setUser(user.data);
  };

  const projectHandler = () => {
    const cards = [];
    projects.map((project, key) => {
      cards.push(
        <div className="col-md-4 col-sm-6 mb-4 pb-2" key={project.id}>
          <div className="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
            <div className="p-3 position-relative">
              <div className="list-card-body">
                <h3> Project Name : {project.projectName}</h3>
                <p> Company Name : {project.companyName}</p>
                <p> Project Status : {project.project_status}</p>
                <p> Project Start Date : {project.project_startdate}</p>
                <p> Project End Date : {project.project_enddate}</p>
                <div className="text-center"><Link className="btn btn-primary btn-sm" to="/Participants"  state={project.id}>View Participant</Link> <Link className="btn btn-primary btn-sm" to="/Edit_Project_Details"  state={project.id}>Edit Project</Link></div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return cards;
  };

  return (
    <>
      <Header />
      <div className="text-center">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <div className="osahan-account-page-left shadow-sm bg-info h-100">
                <div className="border-bottom p-4">
                  <div className="osahan-user text-center">
                    <div className="osahan-user-media">
                      <div className="osahan-user-media-body">
                        <h4 className="mb-2">
                          {user.firstName + " " + user.lastName}
                        </h4>
                        <p className="mb-1">{user.type_of_emp}</p>
                        <p>{user.email}</p>
                        <p className="mb-0 text-black font-weight-bold">
                          <Link
                            className="text-white mr-3"
                            data-toggle="modal"
                            to="/Edit_Profile"
                          >
                            <i className="icofont-ui-edit"></i> EDIT
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="osahan-account-page-right shadow-sm bg-info p-4 h-100">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade  active show"
                    id="favourites"
                    role="tabpanel"
                    aria-labelledby="favourites-tab"
                  >
                    <h4 className="font-weight-bold mt-0 mb-4">Project List</h4>
                    <div className="row">{projectHandler()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager_Dashboard;
