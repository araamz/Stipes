import React from "react";
import { Outlet } from "react-router-dom";

function ViewStory(props) {
  return (
    <div>
      <div>
        <p>Viewing Story</p>
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default ViewStory;
