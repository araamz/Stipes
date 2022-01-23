import React from "react";
import { Link } from "react-router-dom";
import styles from "./Goal.module.css";

function Goal(props) {
  function note_status(status) {
    if (props.status == status) {
      return "todo_background_utility";
    } else if (props.status == status) {
      return "inprogress_background_utility";
    } else {
      return "completed_background_utility";
    }
  }
  return (
    <Link
      to={props.to}
      className={`${styles.story} ${note_status(props.status)}`}
    >
      <p>{props.children}</p>
    </Link>
  );
}
export default Goal;
