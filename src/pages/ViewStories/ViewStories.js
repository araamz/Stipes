import React, { useEffect, useState } from "react";
import Story from "../../components/Story/Story";
import styles from "./ViewStories.module.css";

function ViewStories(props) {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => setStories(data));
  }, []);
  return (
    <div className={styles.ViewStories}>
      {stories.map((story) => (
        <Story to={`/${story.id}`} key={story.id}>
          {story.content}
        </Story>
      ))}
    </div>
  );
}
export default ViewStories;
