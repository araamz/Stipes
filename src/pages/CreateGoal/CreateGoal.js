import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import Toast from "../../components/Toast/Toast";
import styles from "./CreateGoal.module.css";

// *** BEGIN "CreateGoal.js" DOCUMENTATION ***
// CreateGoal.js is a view used to create new goals that are
// added to stories. This page features the use of the "useState()"
// and "useParams()" hooks. This view uses the "fetch()" API to
// communicate to the backend and POST new goal records to the
// database.
// * State Hooks Explained
// The CreateGoal.js view uses three stateful variables being
// "content", "goal", and "successful".
// 1. "content" is used to make form data stateful, this means
// form data is always live and updates when the textarea has been
// changed.
// 2. "successful" is used to make the Toast element display when the
// new goal record has been successfully added to the database based
// upon a successful response from the backend.
// 3. "goal" is used to save successful "content" messages sent to
// backend. "goal" is displayed within the Toast element and set
// after a successful response from the backend when adding a new
// goal to the database.
// * Params Hook Explained
// 1. The "useParams()" hook is used to get a object of parameters in
// in the URL. In this case, the hook is making the "story_id"
// URL parameter accessible to the function component.
// * Fetch Explained
// 1. "fetch()" is a native (and promised-based) JavaScript API used
// to communicate with webservers. The use of the Fetch API provides
// a response object that can be used for error handling and
// accessing of server responses. JavaScript promises are unravled
// by ".then()" or ".catch()" calls. ".then()" calls take in objects
// that can be used to determine if a response failed or was
// successful.
// 2. If a response is not within the 2xx range of HTTP
// responses (this can be checked by "!response.ok") then the server
// has had a error with responding to the server request. If a
// response is successful ".then()" is used to pass the response
// data and conduct other operations.
// *** END "CreateGoal.js" DOCUMENTATION ***

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
