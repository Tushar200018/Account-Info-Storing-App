import axios from "axios";
import React, { useState } from "react";
import { Button } from "reactstrap";
import AccountCard from "../AccountCard";
import PageTitle from "../PageTitle";

function FetchAccount(){

    const [msg,setMsg]=useState("");
    const [accounts,setAccounts] = useState([]);
    const notPresentMsg = "No Accounts to Fetch"

    function handleSubmit(){
        axios.get("http://localhost:3001/accounts")
        .then(res=>{
            res.data.msg===notPresentMsg
            ? setMsg(notPresentMsg)
            : setAccounts(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return (
        <div>
            <PageTitle title="Fetch Account" />
            <Button color="dark" size="lg" onClick={handleSubmit} style={{
                    display: "block",
                    margin: "7% auto 0",
                    padding: "10px 90px"
                }}>Fetch Account</Button>
                <p className="response-msg">{msg}</p>

            {accounts.map((account,index)=><AccountCard 
            key={index}
            firstName={account.firstName}
            lastName={account.lastName}
            mobile={account.mobile}
            age={account.age}
            />)}

        </div>
    );
}

export default FetchAccount;