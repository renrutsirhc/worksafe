import React from "react"

const PillarButtonClickable = props => {
    function toggle(event) {
        event.preventDefault();
    if (props.checked == true) {
      props.toggleChecked(false)
    } else {
      props.toggleChecked(true)
    }
  }

  if (props.checked) {
    return (
      <button className="button pillar-button" disabled={props.disabled} onClick={toggle}>
        {props.pillarname}
      </button>
    )
  } else {
    return (
      <button className="button pillar-button-unselected" disabled={props.disabled} onClick={toggle}>
        {props.pillarname}
      </button>
    )
  }
}
export default PillarButtonClickable
