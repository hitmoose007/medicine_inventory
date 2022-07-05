import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate=useNavigate();
  function handleClick(){
    localStorage.clear()
    navigate("/")
  }
  return (
    <div className="header">
      Community Health Clinic
      <div className="btnCont">
      <Link to="/add">
        <button className="button-1">
          <span>Add Items</span>
        </button>
      </Link>
      <button className="button-1" onClick={handleClick} >
        <span>Logout</span>
      </button>
      </div>
    </div>
  );
}
