import React from "react";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MedForm from "../components/medForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Update() {
  const [formData, setFormData] = useState({
    id:"",
    name: "",
    description: "",
    price: "",
    quantity: "",
  });
  axios.defaults.headers.common["Authorization"] =
    localStorage.getItem("accessToken");

  const params = useParams();
  const navigate=useNavigate();
  
  useEffect(() => {
    const result = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/medicines/${params.id}`
      );
      setFormData({
        id:res.data[0].id,
        name: res.data[0].name,
        description: res.data[0].description,
        price: res.data[0].price,
        quantity: res.data[0].quantity,
      });
    };
    result();
  }, []);

  const handleChange = (field,value) => {
    setFormData({ ...formData, [field]: value });
  };

  function handleSubmit(event){
    event.preventDefault()
    const submit=async()=>{
        await axios.put(`http://localhost:5000/api/medicines/${formData.id}`,{
            name:formData.name,
            description:formData.description,
            quantity:formData.quantity,
            price:formData.price,
        }).catch(error=>{
            alert(error.message)
        })
    }
    submit();
    navigate("/main")
  }
  return (
    <div>
      <Header />
      <div className="medForm">
        <MedForm  
          key={formData.id}
          name={formData.name}
          description={formData.description}
          price={formData.price}
          quantity={formData.quantity}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
