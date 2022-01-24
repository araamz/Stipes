import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import Toast from "../../components/Toast/Toast";
import styles from "./CreateGoal.module.css";

function CreateGoal(props) {
  let { story_id } = useParams();
  const [content, setContent] = useState("");
  const [goal, setGoal] = useState("");
  const [successful, setSuccessful] = useState(false);
  const base_url = `/api/${story_id}/goals`;

  const content_createHandler = (event) => {
    event.preventDefault();
    if (content === "") {
      alert("Please enter a message.");
    } else {
      fetch(`${base_url}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw Error(`${response.statusText} - ${response.status}`);
          }
          setSuccessful(true);
          setGoal(content);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const content_changeHandler = (event) => {
    setContent(event.target.value);
  };

  return (
    <div className="section_layout_utility">
      <p>
        <span className="bold_text_utility">Instructions:</span> Creating a user
        goal entails the format of "I need to complete (task) to furthur develop
        the user story." This format is a common convention to create a new User
        Goal.
      </p>
      <textarea value={content} onChange={content_changeHandler} />
      <Toast display={successful}>
        Creation of the goal "{goal}" was successful.
      </Toast>
      <Button
        icon="add"
        className={styles.create_button}
        onClick={content_createHandler}
      >
        Create
      </Button>
    </div>
  );
}

export default CreateGoal;
