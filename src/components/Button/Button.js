import React from "react";
import styles from "./Button.module.css";

function Button(props) {
  return (
    <button
      className={`${styles.Button} radius_border_utility ${props.className}`}
      style={props.color ? { background: props.color } : {}}
      onClick={props.onClick}
    >
      {props.icon ? <span className="material-icons"> {props.icon} </span> : ""}
      <p>{props.children}</p>
    </button>
  );
}
export default Button;
