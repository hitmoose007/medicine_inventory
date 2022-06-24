import React from "react";
import { useState } from "react";

export default function Form(props) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  //we get the url through props according to register or login
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
    //post request hogi, according to the url
  }
  return (
      <div class="login-box">
        <h2>{props.title}</h2>
        <form>
          <div className="user-box">
            <input
              type="text"
              name="username"
              required=""
              onChange={handleChange}
              value={formData.username}
            />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name="password"
              required=""
              onChange={handleChange}
              value={formData.password}
            />
            <label>Password</label>
          </div>
          <a href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <input
              className="submit"
              type="submit"
              value={props.title}
              onClick={handleSubmit}
            />
          </a>
        </form>
      </div>

  );
}
