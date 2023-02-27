import React, { useState } from "react";
import PageTitle from "../PageTitle";
import { Label, Input, Button } from "reactstrap";
import axios from "axios";

function DeleteAccount() {

    const [enteredMobile, setEnteredMobile] = useState("");
    const [msg,setMsg] = useState("");

    function handleChange(e) {
        setMsg("");
        setEnteredMobile(e.target.value);
    }

    function handleSubmit() {
        axios.delete("http://localhost:3001/accounts/"+enteredMobile)
        .then(res=>{
            setMsg(res.data.msg);
        })
        .catch(err=>{
            console.log(err);
            setMsg("Error in Deleting the Account");
        })
        setEnteredMobile("");
    }

    return (
        <div>
            <PageTitle title="Delete Account" />
            <div style={{ width: "40%", margin: "8% 0 0 30%" }}>
                <Label for="enteredMobile">Mobile Number</Label>
                <Input
                    type="text"
                    name="enteredMobile"
                    id="enteredMobile"
                    value={enteredMobile}
                    onChange={(e) => {
                        handleChange(e);
                    }}
                />
                <Button color="dark" size="lg" onClick={handleSubmit} style={{
                    display: "block",
                    margin: "7% auto 0",
                    padding: "10px 90px"
                }}>Delete Account</Button>
                <p className="response-msg">{msg}</p>
            </div>

        </div>
    );
}

export default DeleteAccount;