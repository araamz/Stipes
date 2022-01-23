import React from "react";
import styles from "./SectionNavLink.module.css";
import { NavLink } from "react-router-dom";

function SectionNavLink(props) {
  return (
    <NavLink
      end
      to={props.to}
      state={props.state}
      className={({ isActive }) =>
        isActive
          ? `${styles.active} ${styles.SectionNavLink}`
          : `${styles.SectionNavLink}`
      }
    >
      {props.icon ? <span className="material-icons"> {props.icon} </span> : ""}
      <p>{props.children}</p>
    </NavLink>
  );
}
export default SectionNavLink;
