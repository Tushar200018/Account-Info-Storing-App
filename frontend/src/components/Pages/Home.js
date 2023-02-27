import React from "react";
import PageTitle from "../PageTitle";
import HomeButton from "../HomeButton";

function Home(){
    return (
        <div>
            <PageTitle title="Home" />
            <div style={{height:"20vh"}}></div>

            <div className="home-buttons">
            <HomeButton text="Add Account" link = "/add-account" />
            <HomeButton text="Fetch Account" link="fetch-account" />
            <HomeButton text="Update Account" link="update-account" />
            <HomeButton text="Delete Account" link="delete-account" />
            </div>
            
        </div>
    );
}

export default Home;