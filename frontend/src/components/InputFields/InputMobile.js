import React,{Component} from "react";
import {
    FormFeedback,
    FormGroup,
    Label,
    Input,
  } from 'reactstrap';


  class InputMobile extends Component{
    constructor(props){
        super(props);
        this.state={
            mobile: props.mobile,
            validate: {
                mobileState: ""
            }
        };
    }

    clearInput(){
      this.setState({
        mobile: "",
        validate: {
            mobileState: ""
        }
    });
    }

    handleChange(e){
        const value = e.target.value;
        this.setState({mobile:value});
        let isValid = this.state.validate.mobileState==="has-success"
        this.props.onInputChange("mobile",value,isValid);
    }

    validateMobile(e){
    
    const mobileRex = /^[0-9]{10}$/;
    const { validate } = this.state;

    if (mobileRex.test(e.target.value)) {
      validate.mobileState = "has-success";
    } else {
      validate.mobileState = "has-danger";
    }

    this.setState({ validate: validate });
    }


    render(){
        return (
            <FormGroup>
            <Label for="mobile">Mobile Number</Label>
            <Input
              type="text"
              name="mobile"
              id="mobile"
              readOnly={this.props.isReadOnly}
              valid={this.state.validate.mobileState === "has-success"}
              invalid={this.state.validate.mobileState === "has-danger"}
              value={this.state.mobile}
              onChange={(e) => {
                this.validateMobile(e);
                this.handleChange(e);
              }}
            />
            <FormFeedback>
              Mobile Number must contain 10 digits
            </FormFeedback>
            
          </FormGroup>
        );
    }

  }

  export default InputMobile;