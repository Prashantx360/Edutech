import React, { useState, useEffect, useRef } from "react";
import { TagsInput } from "react-tag-input-component";
import axios from "axios";
const INITIAL_STATE = {
  skills: "",

  id: 0,
};
const Add_Skills = () => {
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
        if (user.data.skills) {
          user.data.skills?.map((val, key) => {
            skills[key] = val;
          });
          // setSkills(skills)
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (skills) {
        console.log("skills", skills);
        user["skills"] = skills;
        setUser(user);
        console.log("users", user);
      }
      // console.log("Data for update : ", user);
      // const user_id = localStorage.getItem("user_id");
      console.log("id", user);
      const response = await axios.put(
        `http://localhost:3333/employees/${user.id}`,
        user
      );
      console.log("response", response);
      form.current.reset();
      setUser("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form ref={form} onSubmit={handleSubmit}>
        <div className="form-group ">
          <div className="form-group ">
            <label> Skills</label>
            <TagsInput
              value={skills}
              name="skills"
              placeholder={"Add skills"}
              onChange={setSkills}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {" "}
          Add Skills
        </button>
      </form>
    </div>
  );
};

export default Add_Skills;
