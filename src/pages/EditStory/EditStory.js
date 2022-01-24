import React, { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Toast from "../../components/Toast/Toast";
import Button from "../../components/Button/Button";
import styles from "./EditStory.module.css";

// *** BEGIN "EditStory.js" DOCUMENTATION ***
// EditStory.js is a view used to edit and delete a story. This view
// features the use of multipule differnt hooks including
// "useState()", "useOutletContext()", "useParams()", and
// "useNavigate()". This view uses the "fetch()" API to
// communicate to the backend and PATCH or DELETE a user story.
// * State Hooks Explained
// 1. "content" is used to make form data stateful, this means
// form data is always live and updates when the textarea has been
// changed.
// 2. "successful" is used to make the Toast element display when the
// edited story record has been successfully added to the database based
// upon a successful response from the backend.
// * Params Hook Explained
// 1. The "useParams()" hook is used to get a object of parameters in
// in the URL. In this case, the hook is making the "story_id"
// URL parameter accessible to the function component.
// * Use Navigate Hook Explained
// 1. The "useNavigate()" is used to do simple redirecting when called
// and passed in a URL to the function.
// 2. In this case, "useNavigate()" hook is used to provide the
// "navigate" variable. The "navigate" variable is used to redirect
// the user when they have deleted a story (based upon a successful
// response from the server). The user would be redirected to the
// URL "/".
// * Outlet Context Hook Explained
// 1. The "useOutletContext()" hook is used to grab the state of the
// parent route passed into its outlet element. This state can be
// viewed and set like a normal "useState()" hook except its editing
// the parent route component state.
// 2. Hence in this case, "useOutletContext()" is getting the story
// state from the parent component ViewStory.js and editing it via
// "setStory()" when the story has been successfully edited (based
// upon a successful response from the backend).
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
// *** END "EditStory.js" DOCUMENTATION ***

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
