import React, { useState,useEffect } from "react";
import InputMobile from "../InputFields/InputMobile";
import PageTitle from "../PageTitle";
import {Label,Input, Button} from "reactstrap";
import axios from "axios";
import InputFirstName from "../InputFields/InputFirstName";
import InputLastName from "../InputFields/InputLastName";
import InputAge from "../InputFields/InputAge";

function UpdateAccount(){

    const [enteredMobile,setEnteredMobile] = useState("");

    const [accountData, setAccountData] = useState({
        firstName: "",
        lastName: "",
        mobile: "",
        age: ""
    });

    const[msg,setMsg] = useState("");

    const [inputValidations, setInputValidations] = useState({
        firstName: true,
        lastName: true,
        mobile: true,
        age: true
    });

    const [isFormValidated, setIsFormValidated] = useState(true);

    const [isSubmitted,setIsSubmitted] = useState(false);

    const notPresentMsg = "Account does not exist";
    const presentMsg = "Account Found";


    // Disabling the submit button if the form is not validated

    useEffect(() => {
        setIsFormValidated(Object.values(inputValidations).every(
            value => value === true
        ));
    }, [inputValidations]);

    // Function passed to the child components for updating the account data and input validations

    function onInputChange(name, value, isValidated) {
        setIsSubmitted(false);

        setAccountData(prev => (
            {
                ...prev,
                [name]: value
            }
        ));

        setInputValidations(prev => (
            {
                ...prev,
                [name]: isValidated
            }
        ));
    }

    function handleSubmit(e) {
        setIsSubmitted(true);
        axios.put("http://localhost:3001/accounts/"+enteredMobile, accountData)
            .then(res => {
                 setMsg(res.data.msg);
                setAccountData({
                    firstName: "",
                    lastName: "",
                    mobile: "",
                    age: ""
                });

                setInputValidations({
                        firstName: true,
                        lastName: true,
                        mobile: true,
                        age: true
                    });
                
                setEnteredMobile("");

            })
            .catch(err => {
                setMsg("Error in Updating");
                console.log(err);
            })
    }

    

    function handleMobileChange(e){
        setMsg("");
        setIsSubmitted(false);
        const value = e.target.value;
        setEnteredMobile(value);
    }

    function getAccount(){
        axios.get("http://localhost:3001/accounts/"+enteredMobile)
        .then(res=>{
            res.data.msg===notPresentMsg 
            ? setMsg(notPresentMsg)
            :setMsg(presentMsg)

            res.data.msg===presentMsg && setAccountData({
                firstName: res.data._doc.firstName,
                lastName: res.data._doc.lastName,
                mobile:res.data._doc.mobile,
                age: res.data._doc.age
            });
        })
        .catch(err=>{
            console.log(err);
        })
        
    }

    return (
        <div>
            <PageTitle title="Update Account" />
            <div className="update-mobile-field">
                <Label for="enteredMobile">Mobile Number</Label>
                <Input
                type="text"
                name="enteredMobile"
                id="enteredMobile"
                value={enteredMobile}
                onChange={(e) => {
                    handleMobileChange(e);
                }}
                />
            </div>
            <Button onClick={getAccount} className="update-mobile-button" color="dark">Enter</Button>
            {(msg!== notPresentMsg && msg!=="" && !isSubmitted) &&
            <div className="update-mobile-field" style={{marginTop:"3%"}}>
            <InputFirstName onInputChange={onInputChange} firstName={accountData.firstName} />
                <InputLastName onInputChange={onInputChange} lastName={accountData.lastName} />
                <InputMobile onInputChange={onInputChange} mobile={accountData.mobile} isReadOnly={true} />
                <InputAge onInputChange={onInputChange} age={accountData.age} />
                <Button color="dark" size="lg" className="form-button" onClick={handleSubmit} disabled={!isFormValidated}>Update Account</Button>
            </div>
            }
            {(msg!=="" && msg!==presentMsg) && <p className="response-msg" style={{margin:"2% 0"}}>{msg}</p>}
        </div>
    );
}

export default UpdateAccount;