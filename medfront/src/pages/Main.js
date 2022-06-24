import React from "react";
import Header from "../components/Header";
import List from "../components/List";

export default function Main(){
    return(
        <div>
            <Header/>
            <div className="list">
                <List
                name="name"
                description="description"
                />
            </div>
        </div>
    )
}