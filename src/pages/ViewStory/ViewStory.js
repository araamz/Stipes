import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { default as NavLink } from "../../components/SectionNavLink/SectionNavLink";

// *** BEGIN "ViewStory.js" DOCUMENTATION ***
// ViewStory.js is a page view used to view new goals and edit the
// selected story. This component uses the "useState()", "useEffect()",
// and "useParams()" hooks. This component also features the use of
// context and allows state to be passed to other components thus
// allowing a component state to be viewed and edited from anotehr
// component.
// * State Hooks Explained
// The ViewStory.js page view uses one stateful variables being
// "story".
// 1. "story" is used to display the selected user story based upon
// the story returned by the backend based upon the "story_id"
// URL parameter. "story" is set within the "useEffect()" hook.
// * Params Hook Explained
// 1. The "useParams()" hook is used to get a object of parameters in
// in the URL. In this case, the hook is making the "story_id"
// URL parameter accessible to the function component.
// * UseEffect Hook Explained
// 1. The "useEffect()" hook is used when the component is first mounted
// and unmounted. Think of the "useEffect()" hook as a constructor
// and destructor. When the component first is mounted, the
// "useEffect()" is called and runs any code within it.
// 2. In this case, the hook uses the "fetch()" API to get the selected
// story (based upon the "story_id" URL parameter) and set the "story"
// state using "setStory()" if the response from the server is successful.
// * Fetch Explained
// 1. "fetch()" is a native (and promised-based) JavaScript API used
// to communicate with webservers. The use of the Fetch API provides
// a response object that can be used for error handling and
// accessing of server responses. JavaScript promises are unravled
// by ".then()" or ".catch()" calls. ".then()" calls take in objects
// that can be used to determine if a response failed or was
// successful.
// 2. If a response is not within the 2xx range of HTTP
// responses (this can be checked by "!response.ok") then the server
// has had a error with responding to the server request. If a
// response is successful ".then()" is used to pass the response
// data and conduct other operations.
// * Passing Context
// 1. A state can be passed from a parent route to nested routes by
// passing the state into a context attribute within the Outlet
// element. This allows components rendered in Outlet
// (and by extension childern routes) to modify the parent component
// state if childern components use the "useOutletContext()" hook.
// *** END "ViewStory.js" DOCUMENTATION ***

function ViewStory(props) {
  let { story_id } = useParams();
  const [story, setStory] = useState({});
  var base_url = "/api";

  useEffect(() => {
    fetch(`${base_url}/${story_id}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(`${response.statusText} - ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setStory(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [base_url, story_id]);

  return (
    <div className="page_layout_utility">
      <p>
        <span className="bold_text_utility">User Story:</span>{" "}
        {`${story.content} (ID-${story.id})`}
      </p>
      <nav>
        <NavLink to="/" icon="list">
          View Stories
        </NavLink>
        <NavLink to={`/${story_id}`} icon="list">
          View Goals
        </NavLink>
        <NavLink to={`/${story_id}/edit`} icon="edit">
          Edit Story
        </NavLink>
        <NavLink to={`/${story_id}/create`} icon="edit">
          Create Goal
        </NavLink>
      </nav>
      <Outlet context={[story, setStory]}></Outlet>
    </div>
  );
}

export default ViewStory;
