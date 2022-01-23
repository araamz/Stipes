import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

function Card(props) {
  return (
    <Link to={props.to} className={`${styles.Card} ${props.className}`}>
      <p>{props.children}</p>
    </Link>
  );
}
export default Card;
