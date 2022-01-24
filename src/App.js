import React from "react";
import { Outlet } from "react-router-dom";
import { default as NavLink } from "./components/SectionNavLink/SectionNavLink";

function App() {
  return (
    <div className="page_layout_utility">
      <p className="title_text_utility">User Stories</p>
      <nav>
        <NavLink to="/" icon="list">
          View Stories
        </NavLink>
        <NavLink to="/create" icon="add">
          New Story
        </NavLink>
      </nav>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
