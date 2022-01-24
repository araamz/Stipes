import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import styles from "./ViewStories.module.css";

function ViewStories(props) {
  const [stories, setStories] = useState([]);
  var base_url = "/api";

  useEffect(() => {
    fetch(base_url)
      .then((response) => {
        if (!response.ok) {
          throw Error(`${response.statusText} - ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setStories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [base_url]);

  return (
    <div className={styles.ViewStories}>
      {stories.map((story) => (
        <Card to={`/${story.id}`} key={story.id}>
          {story.content}
        </Card>
      ))}
    </div>
  );
}
export default ViewStories;
