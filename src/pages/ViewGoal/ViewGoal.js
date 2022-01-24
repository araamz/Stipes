import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import Toast from "../../components/Toast/Toast";
import styles from "./ViewGoal.module.css";

function ViewGoal(props) {
  let { story_id, goal_id } = useParams();
  let navigate = useNavigate();
  const [goal, setGoal] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");
  const [successful, setSuccessful] = useState(false);
  const base_url = `/api/${story_id}/goals/${goal_id}`;

  const set_background = (status) => {
    if (status === "D") {
      return "todo_background_utility";
    } else if (status === "P") {
      return "inprogress_background_utility";
    } else if (status === "C") {
      return "completed_background_utility";
    } else {
      return "";
    }
  };

  useEffect(() => {
    fetch(base_url)
      .then((response) => {
        if (!response.ok) {
          throw Error(`${response.statusText} - ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setGoal(data.content);
        setStatus(data.status);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [base_url]);

  const goal_deleteHandler = (event) => {
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
        navigate(`/${story_id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const status_changeHandler = (event) => {
    fetch(`${base_url}/edit/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: event.target.value,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(`${response.statusText} - ${response.status}`);
        }
        setStatus(event.target.value);
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
      fetch(`${base_url}/edit/content`, {
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
          setGoal(content);
          setSuccessful(true);
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
      <p className={`${styles.goal_text} ${set_background(status)}`}>
        <span className="bold_text_utility">Goal:</span> {goal}
      </p>
      <form className={styles.status_radio}>
        <div>
          <input
            type="radio"
            value="D"
            checked={status === "D"}
            name="status"
            onChange={status_changeHandler}
          />
          <label>To-Do</label>
        </div>
        <div>
          <input
            type="radio"
            value="P"
            checked={status === "P"}
            name="status"
            onChange={status_changeHandler}
          />
          <label>In-Progress</label>
        </div>
        <div>
          <input
            type="radio"
            value="C"
            checked={status === "C"}
            name="status"
            onChange={status_changeHandler}
          />
          <label>Completed</label>
        </div>
      </form>
      <textarea onChange={content_changeHandler} value={content} />
      <Toast display={successful}>
        Creation of the goal "{goal}" was successful.
      </Toast>
      <div className={styles.goal_buttons}>
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
          onClick={goal_deleteHandler}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ViewGoal;
