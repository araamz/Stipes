import React from "react";
import Button from "../../components/Button/Button";
import Toast from "../../components/Toast/Toast";
import styles from "./CreateStory.module.css";

// *** BEGIN "CreateStory.js" DOCUMENTATION ***
// CreateStory.js is a view used to create stories that are added to
// the database. This page features the use of the "useState()" hook.
// This view uses the "fetch()" API to communicate to the backend and
// POST new story records to the database.
// * Class Component Explained
// 1. This component is a class component, this works the same as the
// CreateGoal.js functional component. This means the entire element
// is stateful and thus if only one value must be updated within the
// class component state, it must be passed a object with that
// specific value to be edited.
// *** END "CreateStory.js" DOCUMENTATION ***

class CreateStory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      story: "",
      successful: false,
    };
    this.content_changeHandler = this.content_changeHandler.bind(this);
    this.content_createHandler = this.content_createHandler.bind(this);
  }
  base_url = "/api";

  content_createHandler = (event) => {
    event.preventDefault();
    if (this.state.content === "") {
      alert("Please enter a message.");
    } else {
      fetch(`${this.base_url}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: this.state.content,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw Error(`${response.statusText} - ${response.status}`);
          }
          this.setState({
            successful: true,
            story: this.state.content,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  content_changeHandler = (event) => {
    event.preventDefault();
    this.setState({
      content: event.target.value,
    });
  };

  render() {
    return (
      <div className="section_layout_utility">
        <p>
          <span className="bold_text_utility">Instructions:</span> Creating a
          user story entails the format of "As a (description of user), I want
          (functionality) so that (benefit)." This format is a common convention
          to create a new User Story.
        </p>
        <textarea
          value={this.state.content}
          onChange={this.content_changeHandler}
        />
        <Toast display={this.state.successful}>
          Creation of the story "{this.state.story}" was successful.
        </Toast>
        <Button
          icon="add"
          className={styles.submit_button}
          onClick={this.content_createHandler}
        >
          Create
        </Button>
      </div>
    );
  }
}
export default CreateStory;
