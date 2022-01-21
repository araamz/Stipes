import React from "react";
import styles from "./Goal.module.css";
import { Link } from "react-router-dom";

function Goal(props) {
  function note_status() {
    if (props.status == "D") {
      return styles.todo;
    } else if (props.status == "P") {
      return styles.inprogress;
    } else {
      return styles.completed;
    }
  }

  return (
    <Link to={props.to} className={`${styles.story} ${note_status()}`}>
      <p>{props.children}</p>
    </Link>
  );
}
export default Goal;
