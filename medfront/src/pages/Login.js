import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../components/form";
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
const title = "Login";
const submitBtn = "Login";
const redirect = "/";

export default function Login() {
  return (
    <div>
      <Form
        title={title}
        formArr={formmArr}
        submitBtn={submitBtn}
        redirect={redirect}
      />
      <Link to='/'></Link>
    </div>
  );
}
