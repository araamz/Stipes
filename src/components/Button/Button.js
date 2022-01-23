import React from "react";
import styles from "./Button.module.css";

function Button(props) {
  return (
    <button
      className={`${styles.Button} ${props.className}`}
      onClick={props.onClick}
    >
      {props.icon ? <span className="material-icons"> {props.icon} </span> : ""}
      <p>{props.children}</p>
    </button>
  );
}
export default Button;
