import React from "react";
import Header from "../components/Header";
import List from "../components/List";
import { useState,useEffect } from "react";
import axios from "axios";

export default function Main(){
    const [meds,setMeds]=useState()
    useEffect(()=>{
        const result = async()=>{
            const res=await axios("https://randomuser.me/api/")//just for testing
            setMeds(res.data.results)
        }
        result();
    },[])
    console.log(meds)
    const medList=meds?.map((med)=>{
        return <List id={med.id.value} name={med.name.first} email={med.email}/>//just for testing will change the props later when using our real db
    })
    return(
        <div>
            <Header/>
            <div className="list-cont">
                {medList}
            </div>
        </div>
    )
}