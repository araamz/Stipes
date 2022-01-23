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
      <p className="page-subtitle">
        <span className="bold"> User Story: </span> {story.content} (ID-
        {story.id})
      </p>
      <nav>
        <SectionNavLink to="/" icon="list" color="#FFB74D">
          View Stories
        </SectionNavLink>
        <SectionNavLink to={`/${story_id}`} icon="list" color="#FFB74D">
          View Goals
        </SectionNavLink>
        <SectionNavLink to={`/${story_id}/edit`} icon="edit" color="#90A4AE">
          Edit Story
        </SectionNavLink>
        <SectionNavLink to={`/${story_id}/create`} icon="edit" color="#81C784">
          Create Goal
        </SectionNavLink>
      </nav>
      <div className="page-section">
        <Outlet context={[story, setStory]}></Outlet>
      </div>
    </div>
  );
}

export default ViewStory;
