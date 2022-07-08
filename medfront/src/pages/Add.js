import React from "react";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MedForm from "../components/medForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Add() {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("accessToken");

  useEffect(() => {
    const getCategories = async () => {
      axios.get(`http://localhost:5000/api/category`).then((res) => {
        setCategories(res.data);
        console.log(res.data);
      });
    };
    getCategories();
    //Runs only on the first render
  }, []);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);

  const categoryList = categories?.map((category) => {
    return (
      //option of category
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    );
  });

  const params = useParams();
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  function handleSubmit(event) {
    event.preventDefault();
    const submit = async () => {
      if (categories > 0) {
        
      await  axios
          .post(`http://localhost:5000/api/medicines/${formData.category}`, {
            name: formData.name,
            description: formData.description,
            quantity: formData.quantity,
            price: formData.price,
            category: formData.category,
          })
          .then((res) => {
            console.log(res.data);
          });
      } else {
        console.log("here");
        await axios
          .post(`http://localhost:5000/api/medicines/`, {
            name: formData.name,
            description: formData.description,
            quantity: formData.quantity,
            price: formData.price,
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    };
    submit();
  }
  return (
    <div>
      <Header />
      <div className='medForm'>
        <form className=' bg-slate-200 w-2/5 m-auto p-7 rounded-md'>
          name{" "}
          <input
            className='border-2 border-gray-600 p-2 w-full'
            type='text'
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          description{" "}
          <input
            className='border-2 border-gray-600 p-2 w-full'
            type='text'
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          price{" "}
          <input
            className='border-2 border-gray-600 p-2 w-full'
            type='text'
            value={formData.price}
            onChange={(e) => handleChange("price", e.target.value)}
          />
          quantity{" "}
          <input
            className='border-2 border-gray-600 p-2 w-full'
            type='text'
            value={formData.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
          />
          <label htmlfor='category'>Choose a category:</label>
          <select
            name='category'
            selected=''
            onChange={(e) => handleChange("category", e.target.value)}
          >
            <option value=''></option>
            {categoryList}
          </select>
          <input
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-4 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
            value='Submit'
            onClick={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
}
