import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "../components/form";

import useFetch from "../components/utils";

const formmArr = [
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    required: true,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    required: true,
  },
];
const prepareForm = (formArr) => {
  return formArr.reduce((r, v) => ({ ...r, [v.name]: "" }), {});
};

const title = "Login";
const submitBtn = "Login";
const redirect = "/";

const url = "http://localhost:5000/api/auth/login";

const onSubmit = (data) => {
  if (data.accessToken) {
    console.log(data.accessToken);
    localStorage.setItem("accessToken", data.accessToken);
  } else {
    console.log(data.error);
  }
};

export default function Login() {
  return (
    <div>
      <Form
        title={title}
        formArr={formmArr}
        submitBtn={submitBtn}
        redirect={redirect}
        url={url}
        onSubmit={onSubmit}
      />
      <Link to='/'></Link>
    </div>
  );
}
