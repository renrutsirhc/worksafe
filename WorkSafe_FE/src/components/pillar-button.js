import React from "react";

const PillarButton = (props) => {
    if (props.checked) {
        return (
            <button className="button pillar-button" disabled={props.disabled}>{props.pillarname}</button>
        );
    } else {
        return (
            <button className="button pillar-button-unselected" disabled={props.disabled}>{props.pillarname}</button>
        );
    }
};
export default PillarButton;