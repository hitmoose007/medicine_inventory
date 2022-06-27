import React from "react";
import Form from "../components/form";
import { Link } from "react-router-dom";
export default function Register() {
  const formmArr = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Enter your name",
      required: true,
    },
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
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm your password",
      required: true,
    },
  ];
  const submitBtn = "Register";
  const redirect = "/login";
  const title = "Register";

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
