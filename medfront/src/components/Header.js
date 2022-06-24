import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      Community Health Clinic
      <div className="btnCont">
      <Link to="/add">
        <button className="button-1">
          <span>Add Items</span>
        </button>
      </Link>
      <button className="button-1">
        <span>Logout</span>
      </button>
      </div>
    </div>
  );
}
