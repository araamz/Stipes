import React from "react";
import {Outlet, Link, Navigate} from "react-router-dom";
import "./App.css";
import SectionNavLink from "./components/Button/SectionNavLink";

function App() {

  return (

    <div className="main-page">
      <p className="page-title">
        User Stories
      </p>
      <nav>

        <SectionNavLink to="/" icon="list" color="#FFB74D">View Stories</SectionNavLink>
        <SectionNavLink to="create" icon="add" color="#81C784">New Story</SectionNavLink>

      </nav>
      <div className="page-section">

        <Outlet></Outlet>

      </div>
    </div>
    
  );
  
}

export default App;
