import React from "react";
import Button from "../components/Button/Button";
import styles from "./CreateStory.module.css";

class CreateStory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      successful: false,
      submittedStory: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }
  handleSubmit(event) {
    if (this.state.value === "") {
      alert("Please enter a message.");
    } else {
      fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: this.state.value,
        }),
      });
    }
    this.setState({
      successful: true,
      submittedStory: this.state.value,
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
        <div className={styles.form}>
          <form>
            <textarea
              className={styles.textarea}
              value={this.state.value}
              onChange={this.handleChange}
            ></textarea>
            <Button type="submit" color="#81C784" onClick={this.handleSubmit}>
              Create
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
export default CreateStory;
