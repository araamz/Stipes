import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import Button from "../../components/Button/Button";
import Toast from "../../components/Toast/Toast";
import styles from "./ViewGoal.module.css";

function ViewGoal(props) {
  let { story_id, goal_id } = useParams();
  let navigate = useNavigate();
  const [content, setContent] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [status, setStatus] = useState("");
  const [submittedContent, setSubmittedContent] = useState("");

  useEffect(() => {
    fetch(`/api/${story_id}/goals/${goal_id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setContent(data.content);
        setStatus(data.status);
      });
  }, []);

  function set_background(status) {
    if (status == "D") {
      return "todo_background_utility";
    } else if (status == "P") {
      return "inprogress_background_utility";
    } else if (status == "C") {
      return "completed_background_utility";
    } else {
      return "";
    }
  }

  function handleChange_content(event) {
    setSubmittedContent(event.target.value);
  }

  function handleChange_status(event) {
    fetch(`/api/${story_id}/goals/${goal_id}/edit/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: event.target.value,
      }),
    });
    setStatus(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (submittedContent === "") {
      alert("Please enter a message.");
    } else {
      fetch(`/api/${story_id}/goals/${goal_id}/edit/content`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: submittedContent,
        }),
      });
      setContent(submittedContent);
      setSuccessful(true);
    }
  }
  function handleDelete(event) {
    event.preventDefault();
    fetch(`/api/${story_id}/goals/${goal_id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate(`/${story_id}`);
  }

  return (
    <div className="section_layout_utility">
      <p className={`${styles.goal_text} ${set_background(status)}`}>
        <span className="bold_text_utility">Goal:</span> {content}
      </p>
      <form className={styles.status_radio}>
        <div>
          <input
            type="radio"
            value="D"
            checked={status === "D"}
            name="status"
            onChange={handleChange_status}
          />
          <label>To-Do</label>
        </div>
        <div>
          <input
            type="radio"
            value="P"
            checked={status === "P"}
            name="status"
            onChange={handleChange_status}
          />
          <label>In-Progress</label>
        </div>
        <div>
          <input
            type="radio"
            value="C"
            checked={status === "C"}
            name="status"
            onChange={handleChange_status}
          />
          <label>Completed</label>
        </div>
      </form>
      <textarea onChange={handleChange_content} value={submittedContent} />
      <Toast display={successful}>
        Goal edit "{submittedContent}" was successful.
      </Toast>
      <div className={styles.goal_buttons}>
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

export default ViewGoal;
