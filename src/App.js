import React from "react";
import { Outlet } from "react-router-dom";
import SectionNavLink from "./components/SectionNavLink/SectionNavLink";

function App() {
  return (
    <div className="page_layout_utility">
      <p className="title_text_utility">User Stories</p>
      <nav>
        <SectionNavLink to="/" icon="list">
          View Stories
        </SectionNavLink>
        <SectionNavLink to="/create" icon="add">
          New Story
        </SectionNavLink>
      </nav>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
