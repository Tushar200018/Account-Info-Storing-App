import React,{Component} from "react";
import {
    FormFeedback,
    FormGroup,
    Label,
    Input,
  } from 'reactstrap';


  class InputAge extends Component{
    constructor(props){
        super(props);
        this.state={
            age: props.age,
            validate: {
                ageState: ""
            }
        };
    }

    clearInput(){
      this.setState({
        age: "",
        validate: {
            ageState: ""
        }
    });
      
    }

    handleChange(e){
        const value = e.target.value;
        this.setState({age:value});
        let isValid = this.state.validate.ageState==="has-success"
        this.props.onInputChange("age",value,isValid);
    }

    validateAge(e){
    
    const ageRex = /^([0-9]{1,2}|100)$/;
    const { validate } = this.state;

    if (ageRex.test(e.target.value)) {
      validate.ageState = "has-success";
    } else {
      validate.ageState = "has-danger";
    }

    this.setState({ validate: validate });
    }


    render(){
        return (
            <FormGroup>
            <Label for="age">Age</Label>
            <Input
              type="text"
              name="age"
              id="age"
              valid={this.state.validate.ageState === "has-success"}
              invalid={this.state.validate.ageState === "has-danger"}
              value={this.state.age}
              onChange={(e) => {
                this.validateAge(e);
                this.handleChange(e);
              }}
            />
            <FormFeedback>
              Age must contain a number from 1-100
            </FormFeedback>
            
          </FormGroup>
        );
    }

  }

  export default InputAge;