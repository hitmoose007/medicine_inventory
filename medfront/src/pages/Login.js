import React from "react";
import { useState } from "react";

export default function Login() {
    const [formData,setFormData]=useState({
        username:"",
        password:""
    });
    function handleChange(event){
        const {name,value}=event.target;
        setFormData((prevFormData)=>{
            return{
                ...prevFormData,
                [name]:value,
            }
        })
    }
    function handleSubmit(event){
        event.preventDefault()
        console.log(formData)
    }
  return (
    <div class="login-box">
      <h2>Login</h2>
      <form>
        <div class="user-box">
          <input type="text" name="username" required="" onChange={handleChange} value={formData.username}/>
          <label>Username</label>
        </div>
        <div class="user-box">
        <input type="password" name="password" required="" onChange={handleChange} value={formData.password}/>
          <label>Password</label>
        </div>
        <a href="#">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <input type="submit" value="Login" onClick={handleSubmit}/>
        </a>
      </form>
    </div>
  );
}
