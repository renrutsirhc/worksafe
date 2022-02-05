import React from "react";
import { Button } from "react-bootstrap";

const PillarButton = (props) => {
    if (props.checked) {
        return (
            < Button disabled={props.disabled}> {props.pillarname}</Button >
        ); 
    } else {
        return (
            <Button variant="secondary" disabled={props.disabled}>{props.pillarname}</Button>
        );
    }
};
export default PillarButton;
