import React, { useEffect, useState } from "react";
import PageTitle from "../PageTitle";
import InputFirstName from "../InputFields/InputFirstName";
import { Form, Button } from "reactstrap";
import InputLastName from "../InputFields/InputLastName";
import InputMobile from "../InputFields/InputMobile";
import InputAge from "../InputFields/InputAge";
import axios from "axios";

function AddAccount() {

    const [accountData, setAccountData] = useState({
        firstName: "",
        lastName: "",
        mobile: "",
        age: ""
    });

    const [inputValidations, setInputValidations] = useState({
        firstName: false,
        lastName: false,
        mobile: false,
        age: false
    });

    const [isFormValidated, setIsFormValidated] = useState(false);

    const [isSubmitted,setIsSubmitted] = useState(false);

    const [msg,setMsg] = useState("");

    // References for clearing Input fields

    const clearFirstNameRef = React.createRef();
    const clearLastNameRef = React.createRef();
    const clearMobileRef = React.createRef();
    const clearAgeRef = React.createRef();

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
        e.preventDefault();
        axios.post("http://localhost:3001/accounts", accountData)
            .then(res => {
                 setMsg(res.data.msg);
                setAccountData({
                    firstName: "",
                    lastName: "",
                    mobile: "",
                    age: ""
                });

                setInputValidations({
                        firstName: false,
                        lastName: false,
                        mobile: false,
                        age: false
                    });

                clearFirstNameRef.current.clearInput();             // Clearing the input fields in child components
                clearLastNameRef.current.clearInput();
                clearMobileRef.current.clearInput();
                clearAgeRef.current.clearInput();
                
                setIsSubmitted(true);

            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <PageTitle title="Add Account" />
            <Form onSubmit={handleSubmit}>
                <InputFirstName onInputChange={onInputChange} firstName={accountData.firstName} ref={clearFirstNameRef} />
                <InputLastName onInputChange={onInputChange} lastName={accountData.lastName} ref={clearLastNameRef} />
                <InputMobile onInputChange={onInputChange} mobile={accountData.mobile} ref={clearMobileRef} />
                <InputAge onInputChange={onInputChange} age={accountData.age} ref={clearAgeRef} />
                <Button color="dark" size="lg" className="form-button" disabled={!isFormValidated}>Create Account</Button>
                {isSubmitted ? <p className="response-msg">{msg}</p> : null}
            </Form>

        </div>
    );
}

export default AddAccount;