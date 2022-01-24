import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import styles from "./ViewGoals.module.css";

function ViewGoals(props) {
  let { story_id } = useParams();
  const [goals, setGoals] = useState([]);
  const base_url = `/api/${story_id}`;

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
    fetch(`${base_url}/goals`)
      .then((response) => {
        if (!response.ok) {
          throw Error(`${response.statusText} - ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setGoals(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [base_url]);

  return (
    <div className={styles.ViewGoals}>
      {goals.map((goal) => (
        <Card
          to={`${goal.id}`}
          key={goal.id}
          className={set_background(goal.status)}
        >
          {goal.content}
        </Card>
      ))}
    </div>
  );
}
export default ViewGoals;
