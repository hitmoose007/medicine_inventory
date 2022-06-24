import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../components/form";

export default function Login() {
  return (
    <div>
    <Form 
    title="Login"
    url=""
    />
      <Link to="/register">
        <button className="button-49">
          <span>Register</span>
        </button>
      </Link>
    </div>
  );
}
