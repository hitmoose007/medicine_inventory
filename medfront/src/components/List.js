import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

export default function List(props) {
  return (
    <li>
      <div className="list">
        <div className="medName">
          <h2>{props.name}</h2>
          <h2>{props.quantity}</h2>
        </div>
        <div className="desc">
          <p>{props.description}</p>
        </div>
        <div className="buttons">
          <button
            className="minus"
            onClick={() => props.handleDecrement(props.id)}
          >
            Minus
          </button>
          <button
            className="plus"
            onClick={() => props.handleIncrement(props.id)}
          >
            Plus
          </button>
          <button
            className="delete"
            onClick={() => props.handleDelete(props.id)}
          >
            Delete
          </button>
          <button className="update">
            <Link to={{pathname:`/update/${props.id}`}}>Update</Link>
          </button>
        </div>
      </div>
    </li>
  );
}
