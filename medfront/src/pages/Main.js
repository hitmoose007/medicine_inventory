import React from "react";
import Header from "../components/Header";
import List from "../components/List";
import { useState,useEffect } from "react";
import axios from "axios";

export default function Main(){
    const [meds,setMeds]=useState()
    const token=`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsNHY5cmpyODAwMDI1NHVpazE0N2s3YnIiLCJpYXQiOjE2NTY3NDc2OTIsImV4cCI6MTY1Njc1MTI5Mn0.cp4bHctE8X7elsGKEn-KbPdTW0ntb1mXwlt3PJhjyOg`//will get from local storage or cookies but this is for testing
    useEffect(()=>{
        const result = async()=>{
            const res=await axios.get("http://localhost:5000/api/medicines/",{headers:{"Authorization":`${token}`}})//just for testing
            setMeds(res.data)
            console.log(res.data)

        }
        result();
    },[meds])
    
  function handleDelete(id){
    const headers={
      'Authorization':`${token}`,
    }
    axios.delete(`http://localhost:5000/api/medicines/${id}`,{headers}).then(()=>console.log("Success"))

  }
    console.log(meds)
    const medList=meds?.map((med)=>{
        return <List id={med.id} name={med.name} description={med.description} token={token} handleDelete={handleDelete}/>//just for testing will change the props later when using our real db
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