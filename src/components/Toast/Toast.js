import React from "react";
import styles from "./Toast.module.css";

function Toast(props) {
  return (
    <>
      {props.display ? (
        <div className={styles.Toast}>
          <span className="material-icons">info</span>
          <p>{props.children}</p>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
export default Toast;
