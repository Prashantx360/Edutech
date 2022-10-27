import New_Login from "./components/New_Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Manager_Dashboard from "./components/Manager_Dashboard";
import Participants from "./components/Participants";
//import ErrorMsg from "./components/ErrorMsg";
//import Login_Page from "./components/Login_Page";
import Registration from "./components/Registration";
import Edit_Profile from "./components/Edit_Profile";
import Project_Details from "./components/Project_Details";
import Edit_Project_Details from "./components/Edit_Project_Details";
import Success from "./components/Success";
import Home from "./components/Home";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/Dashboard" element={<Dashboard />}></Route>
          <Route exact path="/Manager_Dashboard" element={<Manager_Dashboard />}></Route>
          <Route exact path="/Participants" element={<Participants />}></Route>
          <Route exact path="/New_Login" element={<New_Login />}></Route>
          <Route exact path="/Registration" element={<Registration />}></Route>
          <Route exact path="/Edit_Profile" element={<Edit_Profile />}></Route>
          <Route exact path="/Project_Details" element={<Project_Details />}></Route>
          <Route exact path="/Edit_Project_Details" element={<Edit_Project_Details />}></Route>

          <Route exact path="/Success" element={<Success />}></Route>
          <Route exact path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
