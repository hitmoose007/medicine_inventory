import React from "react";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

const url = "http://localhost:5000/api/users";

export default function Login() {
  const [toLogin, setToLogin] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name, email: email, password: password }),
  };

  const validateForm = () => {
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    var emailError, passwordError, nameError, confirmPasswordError;

    if (!name) {
      nameError = "Name is required";
      setNameError(nameError);
      return false;
    }

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

    if (!confirmPassword) {
      confirmPasswordError = "Confirm Password is required";
      setConfirmPasswordError(confirmPasswordError);
      return false;
    }

    if (password !== confirmPassword) {
      confirmPasswordError = "Passwords do not match";
      setConfirmPasswordError(confirmPasswordError);
      return false;
    }

    return true;
  };

  const onSumbitHandler = () => {
    if (!validateForm()) {
      return;
    }

    setEmailError("");
    setPasswordError("");

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (!data.Newuser) {
          throw "error";
        }
      })
      .then(() => {
        setToLogin(true);
      })

      .catch((error) => console.log(error));
  };
  if (toLogin) {
    return <Navigate to='/' />;
  }

  return (
    <div>
      <form className=' bg-slate-200 w-2/5 m-auto p-7 rounded-md'>
        <h1 className=' text-4xl p-6 '>Register</h1>

        <div>
          <label htmlFor='name' className='text-lg'>
            Name
          </label>
          <input
            className='border-2 border-gray-600 p-2 w-full'
            name='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <span className=' text-red-600 text-xs'>{nameError}</span>

        <div>
          <label htmlFor='email' className=' text-lg'>
            Email
          </label>
          <input
            className='border-2 border-gray-600 p-2 w-full'
            name='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <span className='text-red-600 text-xs block '>{emailError}</span>

        <div>
          <label htmlFor='password' className=' text-lg'>
            Password
          </label>
          <input
            className='border-2 border-gray-600 p-2 w-full'
            name='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <span className='text-red-600 text-xs block '>{passwordError}</span>

        <div>
          <label htmlFor='confirmPassword' className=' text-lg'>
            Confirm Password
          </label>
          <input
            className='border-2 border-gray-600 p-2 w-full'
            name='confirmPassword'
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <span className='text-red-600 text-xs block py-1'>
          {confirmPasswordError}
        </span>

        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-4 px-4 rounded focus:outline-none focus:shadow-outline'
          type='submit'
          onClick={(e) => {
            e.preventDefault();
            onSumbitHandler();
          }}
        >
          Register
        </button>
      </form>

      <Link to='/'></Link>
    </div>
  );
}
