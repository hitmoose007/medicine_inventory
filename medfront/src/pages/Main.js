import React from "react";
import Header from "../components/Header";
import List from "../components/List";
import { useState,useEffect } from "react";
import axios from "axios";

export default function Main(){
    const [meds,setMeds]=useState([])
    const [medArr,setMedArr]=useState(meds)
    axios.defaults.headers.common['Authorization'] =localStorage.getItem('accessToken')
    useEffect(()=>{
        const result = async()=>{
            const res=await axios.get("http://localhost:5000/api/medicines/")//just for testing
            setMeds(res.data)
            console.log(res.data)

        }
        result();
    },[medArr])
    
  function handleDelete(id){

    axios.delete(`http://localhost:5000/api/medicines/${id}`).then(()=>console.log("Success"))
    setMedArr(meds)
  }
  function handleIncrement(id){
    axios.put(`http://localhost:5000/api/medicines/increment/${id}`).then(()=>console.log("incremented"))
    setMedArr(meds)
  }
  function handleDecrement(id){

    axios.put(`http://localhost:5000/api/medicines/decrement/${id}`).then(()=>console.log("decremented"))
    setMedArr(meds)
  }
    console.log(meds)
    const medList=meds?.map((med)=>{
        return <List 
        key={med.id}
        id={med.id} 
        name={med.name} 
        description={med.description} 
        quantity={med.quantity} 
        handleDelete={handleDelete} 
        handleIncrement={handleIncrement} 
        handleDecrement={handleDecrement}/>
    })
    return(
        <div>
            <Header/>
            <div className="list-cont">
                <ul>
                    {medList}
                </ul>
            </div>
        </div>
    )
}