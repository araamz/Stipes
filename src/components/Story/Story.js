import React from "react";
import styles from "./Story.module.css";
import { Link } from "react-router-dom";

function Story(props) {
  return (
    <Link to={props.to} className={styles.story}>
      <p>{props.children}</p>
    </Link>
  );
}
export default Story;
