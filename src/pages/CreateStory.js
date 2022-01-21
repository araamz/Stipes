import React from "react";
import Button from "../components/Button/Button";
import styles from "./CreateStory.module.css";

class CreateStory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      story: "",
      submittedStory: "",
      successful: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      story: event.target.value,
    });
  }

  handleSubmit(event) {
    if (this.state.story === "") {
      alert("Please enter a message.");
    } else {
      fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: this.state.story,
        }),
      });
    }
    this.setState({
      successful: true,
      submittedStory: this.state.story,
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className={styles.CreateStory}>
        <p>
          Creating a user story entails the format of "As a (description of
          user), I want (functionality) so that (benefit)." This format is a
          common convention to create a new User Story.
        </p>
        {this.state.successful ? (
          <p className={styles.submit_successful}>
            Creation of the story "{this.state.submittedStory}" was successful.
          </p>
        ) : (
          ""
        )}
        <textarea
          className={styles.textarea}
          value={this.state.story}
          onChange={this.handleChange}
        />
        <Button type="submit" color="#81C784" onClick={this.handleSubmit}>
          Create
        </Button>
      </div>
    );
  }
}
export default CreateStory;
