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
};

const Dashboard = () => {
  const [projects, setProject] = useState([]);
  const [user, setUser] = useState(INITIAL_STATE);
  const user_id = "EMP-" + localStorage.getItem("user_id");
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
    const user = await axios.get(
      `http://localhost:3333/employees/${user_id}`
    );

    setUser(user.data);
  };

  const projectHandler = () => {
    const cards = [];
    const old_cards = [];
    const curdate = new Date().toISOString().slice(0, 10);
    // console.log(projects.length)
    projects?.map((project, key) => {
      project.emp_ids?.map((name,id) => {
        if (name.id === parseInt(user_id)) {
          //curdate < project.project_enddate
          if (projects.length === (key+1)) {
          cards.push(
            <div className="col-md-12 col-sm-12 mb-4 pb-2" key={project.id}>
              <div className="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
                <div className="p-3 position-relative">
                  <div className="list-card-body">
                    <h4> Project Name : {project.projectName}</h4>
                    <p> Company Name : {project.companyName}</p>
                    <p> Project Status : {project.project_status}</p>
                    <p> Project Start Date : {project.project_startdate}</p>
                    <p> Project End Date : {project.project_enddate}</p>
                  </div>
                </div>
              </div>
            </div>
          );
          }
          else if ((projects.length-1) === (key+1)) {
            old_cards.push(
              <div className="col-md-12 col-sm-12 mb-4 pb-2" key={project.id}>
                <div className="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
                  <div className="p-3 position-relative">
                    <div className="list-card-body">
                      <h4> Project Name : {project.projectName}</h4>
                      <p> Company Name : {project.companyName}</p>
                      <p> Project Status : {project.project_status}</p>
                      <p> Project Start Date : {project.project_startdate}</p>
                      <p> Project End Date : {project.project_enddate}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        }
      });
    });
    // console.log([{'cards':cards, 'old_cards': old_cards}])
    return {'cards':cards, 'old_cards': old_cards};
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
                        <h4 className="mb-2">{user.firstName + " " + user.lastName}</h4>
                        <p className="mb-1">{user.designation}</p>
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
                    <h4 className="font-weight-bold mt-0 mb-4 border-bottom">Project List</h4>
                    <div className="col-md-6 border-right">
                      <h5 className="font-weight-bold mt-0 mb-4"> Current Projects </h5>
                      {projectHandler().cards}
                    </div>
                    <div className="col-md-6">
                      <h5 className="font-weight-bold mt-0 mb-4"> Previous Projects </h5>
                      {projectHandler().old_cards}
                    </div>
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

export default Dashboard;
