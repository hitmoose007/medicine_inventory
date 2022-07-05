import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import {AiOutlineMinusCircle,AiOutlinePlusCircle} from "react-icons/ai"
import {FaRegTrashAlt} from "react-icons/fa"

export default function List(props) {
  return (
      <div className="row">
        <div className="col">
          <h2>{props.name}</h2>
        </div>
        <div className="col">
          <p>{props.description}</p>
        </div>
        <div className="col">
          <button
            className="minus"
            onClick={() => props.handleDecrement(props.id)}
          >
            <AiOutlineMinusCircle/>
          </button>
        </div>
        <div className="col">
          <div className="quantity">{props.quantity}</div>
        </div>
        <div className="col">
          <button
            className="plus"
            onClick={() => props.handleIncrement(props.id)}
          >
            <AiOutlinePlusCircle/>
          </button>
        </div>
        <div className="col">
          <button
            className="delete"
            onClick={() => props.handleDelete(props.id)}
          >
            <FaRegTrashAlt/>
          </button>
        </div>
        <div className="col">
          <button className="update">
            <Link to={{ pathname: `/update/${props.id}` }}>Update</Link>
          </button>
        </div>
      </div>
  );
}
