import React,{Component} from "react";
import {
    FormFeedback,
    FormGroup,
    Label,
    Input,
  } from 'reactstrap';


  class InputLastName extends Component{
    constructor(props){
        super(props);
        this.state={
            lastName: props.lastName,
            validate: {
                lastNameState: ""
            }
        };
    }

    clearInput(){
      this.setState({
        lastName: "",
        validate: {
            lastNameState: ""
        }
    });
    }

    handleChange(e){
        const value = e.target.value;
        this.setState({lastName:value});
        let isValid = this.state.validate.lastNameState==="has-success"
        this.props.onInputChange("lastName",value,isValid);
    }

    validateLastName(e){
    
    const lastNameRex = /^[a-zA-Z]+$/;
    const { validate } = this.state;

    if (lastNameRex.test(e.target.value)) {
      validate.lastNameState = "has-success";
    } else {
      validate.lastNameState = "has-danger";
    }

    this.setState({ validate: validate });
    }


    render(){
        return (
            <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              valid={this.state.validate.lastNameState === "has-success"}
              invalid={this.state.validate.lastNameState === "has-danger"}
              value={this.state.lastName}
              onChange={(e) => {
                this.validateLastName(e);
                this.handleChange(e);
              }}
            />
            <FormFeedback>
              The Last Name must contain characters in the range [A-Z a-z]
            </FormFeedback>
            
          </FormGroup>
        );
    }

  }

  export default InputLastName;