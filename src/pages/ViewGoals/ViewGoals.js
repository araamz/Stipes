import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Goal from "../../components/Goal/Goal";
import styles from "./ViewGoals.module.css";

function ViewGoals(props) {
  let { story_id } = useParams();
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch(`/api/${story_id}/goals`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => setGoals(data));
  }, []);
  return (
    <div className={styles.ViewGoals}>
      {goals.map((goal) => (
        <Goal to={`${goal.id}`} status={goal.status} key={goal.id}>
          {goal.content}
        </Goal>
      ))}
    </div>
  );
}
export default ViewGoals;
