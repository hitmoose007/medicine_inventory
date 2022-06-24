import React from "react";
import Form from "../components/form";
import { Link } from "react-router-dom";
export default function Register() {
  return (
    <div>
    <Form 
    title="Register"
    url=""
    />
      <Link to="/">
        <button className="button-49">
          <span>Login</span>
        </button>
      </Link>
    </div>
  );
}
