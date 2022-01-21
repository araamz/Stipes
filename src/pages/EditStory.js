import React, { useContext } from "react";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { useState, useEffect } from "react/cjs/react.development";
import Button from "../components/Button/Button";
import styles from "./EditStory.module.css";

function EditStory(props) {
  let { story_id } = useParams();
  const location = useLocation();
  let navigate = useNavigate();
  console.log(location);
  const [CurrentStory, setCurrentStory] = useOutletContext();
  const [story, setStory] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [submittedStory, setSubmittedStory] = useState("");

  async function handleDelete(event) {
    event.preventDefault();
    await fetch(`/api/${story_id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/");
  }
  function handleChange(event) {
    setStory(event.target.value);
  }
  function handleSubmit(event) {
    if (story === "") {
      alert("Please enter a message.");
    } else {
      fetch(`/api/${story_id}/edit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: story,
        }),
      });

      setCurrentStory({ content: story, id: story_id });
      setSubmittedStory(story);
      setSuccessful(true);
      event.preventDefault();
    }
  }

  return (
    <div className={styles.EditStory}>
      <p>
        Edit or Delete a user story with the following options below. Stories
        can be edited using the textform below.
      </p>
      {successful ? (
        <p className={styles.submit_successful}>
          Story edit "{submittedStory}" was successful.
        </p>
      ) : (
        ""
      )}
      <textarea
        onChange={handleChange}
        value={story}
        className={styles.textarea}
      ></textarea>
      <div className={styles.options}>
        <Button type="submit" color="#81C784" onClick={handleSubmit}>
          Edit
        </Button>
        <Button color="#E57373" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
export default EditStory;
