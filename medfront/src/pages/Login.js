import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const url = "http://localhost:5000/api/auth/login";



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password }),
  };

  const validateForm = () => {
    setEmailError("");
    setPasswordError("");
    var emailError, passwordError;
    if (!email) {
      emailError = "Email is required";
      setEmailError(emailError);
      return false;
    }

    if (email.includes("@") === false) {
      emailError = "Email is not valid";
      setEmailError(emailError);
      return false;
    }
    if (!password) {
      passwordError = "Password is required";
      setPasswordError(passwordError);
      return false;
    }

    return true;
  };

  const onSumbitHandler = () => {
    if (!validateForm()) {
      return;
    }
    console.log("hello");
    setEmailError("");
    setPasswordError("");

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.accessToken) {
          console.log(data.accessToken);
          localStorage.setItem("accessToken", data.accessToken);
        } else {
          
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form className=' bg-slate-200 w-2/5 m-auto p-7 rounded-md'>
        <h1 className=' text-4xl p-6 '>Login</h1>

        <div>
          <label htmlFor='email' className='text-lg'>Email</label>
          <input
            className='border-2 border-gray-600 p-2 w-full'
            name='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <span className=" text-red-600 text-xs">{emailError}</span>

        <div>
          <label htmlFor='password' className=" text-lg">Password</label>
          <input
            className='border-2 border-gray-600 p-2 w-full'
            name='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <span className ="text-red-600 text-xs block py-1">{passwordError}</span>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-4 px-4 rounded focus:outline-none focus:shadow-outline'
          type='submit'
          onClick={(e) => {
            e.preventDefault();
            onSumbitHandler();
          }}
        >
          Login
        </button>
      </form>

      <Link to='/'></Link>
    </div>
  );
}
