import React from "react";

class CreateGoal extends React.Component {
  render() {
    return (
      <div>
        <div>
          <p>
            Creating a user story entails the format of "As a (description of
            user), I want (functionality) so that (benefit)." This format can be
            used as a convention to create a new User Story.
          </p>
        </div>
        <div>
          <form>
            <textarea></textarea>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default CreateGoal;
