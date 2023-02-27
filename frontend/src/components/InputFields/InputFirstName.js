import React,{Component} from "react";
import {
    FormFeedback,
    FormGroup,
    Label,
    Input,
  } from 'reactstrap';


  class InputFirstName extends Component{
    constructor(props){
        super(props);
        this.state={
            firstName: props.firstName,
            validate: {
                firstNameState: ""
            }
        };
    }

    clearInput(){
      this.setState({
        firstName: "",
        validate: {
            firstNameState: ""
        }
    });
    }
    

    handleChange(e){
        const value = e.target.value;
        this.setState({firstName:value});
        let isValid = this.state.validate.firstNameState==="has-success"
        this.props.onInputChange("firstName",value,isValid);
    }

    validateFirstName(e){
    
    const firstNameRex = /^[a-zA-Z]+$/;
    const { validate } = this.state;

    if (firstNameRex.test(e.target.value)) {
      validate.firstNameState = "has-success";
    } else {
      validate.firstNameState = "has-danger";
    }

    this.setState({ validate: validate });
    }


    render(){
        return (
            <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              valid={this.state.validate.firstNameState === "has-success"}
              invalid={this.state.validate.firstNameState === "has-danger"}
              value={this.state.firstName}
              onChange={(e) => {
                this.validateFirstName(e);
                this.handleChange(e);
              }}
            />
            <FormFeedback>
              The First Name must contain characters in the range [A-Z a-z]
            </FormFeedback>
            
          </FormGroup>
        );
    }

  }

  export default InputFirstName;