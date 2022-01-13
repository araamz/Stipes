import React from "react";
import styles from "./Story.module.css";
import { Link } from "react-router-dom";

function Story(props) {

    return (

        <Link to={props.to} className={styles.story}>

            <p>{props.children}</p>
            {props.finished ? <span className="material-icons"> check_circle_outline </span> : ""}

        </Link>

    )
}
export default Story;