import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import SectionNavLink from "../components/SectionNavLink/SectionNavLink";

function ViewStory(props) {
  let { story_id } = useParams();
  const [CurrentStory, setCurrentStory] = useState({});

  useEffect(() => {
    fetch(`/api/${story_id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => setCurrentStory(data));
  }, []);
  return (
    <div className="container">
      <p className="page-subtitle">
        <span className="bold"> User Story: </span> {CurrentStory.content} (ID-
        {CurrentStory.id})
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
        <Outlet context={[CurrentStory, setCurrentStory]}></Outlet>
      </div>
    </div>
  );
}

export default ViewStory;
