import React, { useContext } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useState, useEffect } from "react/cjs/react.development";
import Toast from "../../components/Toast/Toast";
import Button from "../../components/Button/Button";
import styles from "./EditStory.module.css";

function EditStory(props) {
  let { story_id } = useParams();
  let navigate = useNavigate();
  const [story, setStory] = useOutletContext();
  const [submittedStory, setSubmittedStory] = useState("");
  const [successful, setSuccessful] = useState(false);

  function handleDelete(event) {
    event.preventDefault();
    fetch(`/api/${story_id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/");
  }

  function handleChange(event) {
    setSubmittedStory(event.target.value);
  }

  function handleSubmit(event) {
    if (submittedStory === "") {
      alert("Please enter a message.");
    } else {
      fetch(`/api/${story_id}/edit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: submittedStory,
        }),
      });
      event.preventDefault();
      setStory({ content: submittedStory, id: story_id });
      setSuccessful(true);
    }
  }

  return (
    <div className="section_layout_utility">
      <p>
        <span className="bold_text_utility">Instructions:</span> Edit or Delete
        a user story with the following options below. Stories can be edited
        using the textform below.
      </p>
      <textarea onChange={handleChange} value={submittedStory} />
      <Toast display={successful}>
        Creation of the story "{submittedStory}" was successful.
      </Toast>
      <div className={styles.story_buttons}>
        <Button
          icon="edit"
          className={styles.edit_button}
          onClick={handleSubmit}
        >
          Edit
        </Button>
        <Button
          icon="delete"
          className={styles.delete_button}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
export default EditStory;
