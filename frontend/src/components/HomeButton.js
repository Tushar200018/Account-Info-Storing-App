import React from "react";
import {Button} from "reactstrap";
import { Link } from "react-router-dom";

function HomeButton(props){
    return  (
    <Link to={props.link} style={{textDecoration:"none"}}>
    <Button block color="secondary" size="lg">{props.text}</Button>
    <div style={{height: "10vh"}}></div>
    </Link>
    );
}

export default HomeButton;