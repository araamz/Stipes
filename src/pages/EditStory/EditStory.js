import React, { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Toast from "../../components/Toast/Toast";
import Button from "../../components/Button/Button";
import styles from "./EditStory.module.css";

function EditStory(props) {
  let { story_id } = useParams();
  let navigate = useNavigate();
  const [story, setStory] = useOutletContext();
  const [content, setContent] = useState("");
  const [successful, setSuccessful] = useState(false);
  const base_url = `/api/${story_id}`;

  const story_deleteHandler = (event) => {
    event.preventDefault();
    fetch(`${base_url}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(`${response.statusText} - ${response.status}`);
        }
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const content_editHandler = (event) => {
    event.preventDefault();
    if (content === "") {
      alert("Please enter a message.");
    } else {
      fetch(`${base_url}/edit`, {
        method: "PATCH",
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
          setStory({ content: content, id: story_id });
          setSuccessful(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const content_changeHandler = (event) => {
    event.preventDefault();
    setContent(event.target.value);
  };

  return (
    <div className="section_layout_utility">
      <p>
        <span className="bold_text_utility">Instructions:</span> Edit or Delete
        a user story with the following options below. Stories can be edited
        using the textform below.
      </p>
      <textarea onChange={content_changeHandler} value={content} />
      <Toast display={successful}>
        Creation of the story "{story.content}" was successful.
      </Toast>
      <div className={styles.story_buttons}>
        <Button
          icon="edit"
          className={styles.edit_button}
          onClick={content_editHandler}
        >
          Edit
        </Button>
        <Button
          icon="delete"
          className={styles.delete_button}
          onClick={story_deleteHandler}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
export default EditStory;
