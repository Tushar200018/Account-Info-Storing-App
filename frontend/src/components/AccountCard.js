import React from "react";
import {Table} from "reactstrap";

function AccountCard(props){
    return (
        <Table dark style={{
            width: "25%",
            display: "inline-table",
            margin: "20px 40px"
        }}>
        <thead>
        <tr>
                <td>First Name</td>
                <td>{props.firstName}</td>
            </tr>
            <tr>
                <td>Last Name</td>
                <td>{props.lastName}</td>
            </tr>
            <tr>
                <td>Mobile Number</td>
                <td>{props.mobile}</td>
            </tr>
            <tr>
                <td>Age</td>
                <td>{props.age}</td>
            </tr>
        </thead>
            
        </Table>
    );
}

export default AccountCard;