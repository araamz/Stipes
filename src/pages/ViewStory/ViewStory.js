import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import SectionNavLink from "../../components/SectionNavLink/SectionNavLink";

function ViewStory(props) {
  let { story_id } = useParams();
  const [story, setStory] = useState({});

  useEffect(() => {
    fetch(`/api/${story_id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => setStory(data));
  }, []);

  return (
    <div className="page_layout_utility">
      <p>
        <span className="bold_text_utility"> User Story: </span> {story.content}{" "}
        (ID-
        {story.id})
      </p>
      <nav>
        <SectionNavLink to="/" icon="list">
          View Stories
        </SectionNavLink>
        <SectionNavLink to={`/${story_id}`} icon="list">
          View Goals
        </SectionNavLink>
        <SectionNavLink to={`/${story_id}/edit`} icon="edit">
          Edit Story
        </SectionNavLink>
        <SectionNavLink to={`/${story_id}/create`} icon="edit">
          Create Goal
        </SectionNavLink>
      </nav>
      <Outlet context={[story, setStory]}></Outlet>
    </div>
  );
}

export default ViewStory;
