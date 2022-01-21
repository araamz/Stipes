import React from "react";
import Button from "../components/Button/Button";
import styles from "./CreateGoal.module.css";
import { useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";

function CreateGoal(props) {
  let { story_id } = useParams();
  const [goal, setGoal] = useState("");
  const [submittedGoal, setSubmittedGoal] = useState("");
  const [successful, setSuccessful] = useState(false);

  function handleChange(event) {
    setGoal(event.target.value);
  }

  function handleSubmit(event) {
    if (goal === "") {
      alert("Please enter a message.");
    } else {
      fetch(`/api/${story_id}/goals/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: goal,
        }),
      });
    }
    setSuccessful(true);
    setSubmittedGoal(goal);
    event.preventDefault();
  }

  return (
    <div className={styles.CreateGoal}>
      <p>
        Creating a user goal entails the format of "I need to complete (task) to
        furthur develop the user story." This format is a common convention to
        create a new User Goal.
      </p>
      {successful ? (
        <p className={styles.submit_successful}>
          Creation of the goal "{submittedGoal}" was successful.
        </p>
      ) : (
        ""
      )}
      <textarea
        className={styles.textarea}
        value={goal}
        onChange={handleChange}
      />
      <Button type="submit" color="#81C784" onClick={handleSubmit}>
        Create
      </Button>
    </div>
  );
}

export default CreateGoal;
