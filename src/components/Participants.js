import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import {useLocation } from "react-router-dom";

const Participants = () => {
  const location = useLocation();
  const post_data = location.state;
  const [users, setUser] = useState([]);
  const [projects, setProject] = useState([]);
  useEffect(() => {
    loadProject();
    loadUser();
  }, []);

  const loadProject = async () => {
    const projects = await axios.get(
      "http://localhost:3333/employees_project_details"
    );
    setProject(projects.data);
  }

  const loadUser = async () => {
    const users = await axios.get(
      "http://localhost:3333/employees"
    );
    setUser(users.data);
  };

  const userData = () => {
    const emp_data = [];
    // projects.map(async (project, j) => {
    //   if (project.project_id === post_data) {
    //     const emp_id = parseInt(project.emp_ids.split("-")[1]);
    //     const user = await axios.get(
    //       `http://localhost:3333/employees/${emp_id}`
    //     );
    //     emp_data.push(user.data);
    //   }
    // });
    projects.map((project, j) => {
      if (project.id === post_data) {
        // const emp_id = parseInt(project.emp_ids.split("-")[1])
        project.emp_ids?.map((evl,ekey) => {
            users.map((u,k) => {
              if (evl.id === u.id) {
                emp_data.push(u);
              }
            });
        })
      }
    });
    return emp_data;
  }

  const participantHandler = () => {
    const cards = [];
    const user_data = userData();
    user_data.map((usr, i) => {
      if (usr.type_of_emp !== "Manager") {
        cards.push(
          <div className="col-md-4 col-sm-6 mb-4 pb-2" key={i}>
            <div className="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
              <div className="p-3 position-relative">
                <div className="list-card-body">
                  <h3> Full Name : {usr.firstName + " " + usr.lastName}</h3>
                  <p> Email Id : {usr.email}</p>
                  <p> Emp ID : {"Emp-" + usr.id}</p>
                  <p> DOB : {usr.birthdate}</p>
                  <p> Designation : {usr.designation}</p>
                </div>
              </div>
            </div>
          </div>
        );
      }
    })
    return cards;
  };

  return (
    <>
      <Header />
      <div className="text-center">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="osahan-account-page-right shadow-sm bg-info p-4 h-100">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade  active show"
                    id="favourites"
                    role="tabpanel"
                    aria-labelledby="favourites-tab"
                  >
                    <h4 className="font-weight-bold mt-0 mb-4">
                      Participant List
                    </h4>
                    <div className="row">{participantHandler()}</div>
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

export default Participants;
