import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewStory from "./pages/ViewStory/ViewStory";
import CreateStory from "./pages/CreateStory/CreateStory";
import ViewGoal from "./pages/ViewGoal/ViewGoal";
import ViewGoals from "./pages/ViewGoals/ViewGoals";
import EditStory from "./pages/EditStory/EditStory";
import CreateGoal from "./pages/CreateGoal/CreateGoal";
import ViewStories from "./pages/ViewStories/ViewStories";
import App from "./App";
import "./index.css";

// *** BEGIN "EditStory.js" DOCUMENTATION ***
// index.js is a utility file used to setup routes for the
// router. Using this scheme, the application has two page views
// being ViewStories and ViewStory. Nested routes within these two
// page views are rendered by an Outlet element. Outlet elements are
// where nested routes are rendered. Routes can be nested as passed
// two layers (this application is only two layers). Routes can have
// parameters.
// * Route Parameters
// 1. Rotue paramters are used to distingush unique data, simply, a
// page is a template while the parameter can be used to retrieve
// put into a template. Routes are able to use URL parameters using
// the "useParams()" hook.
// *** END "EditStory.js" DOCUMENTATION ***

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ViewStories />} />
          <Route path="create" element={<CreateStory />} />
        </Route>
        <Route path="/:story_id" element={<ViewStory />}>
          <Route index element={<ViewGoals />} />
          <Route path="edit" element={<EditStory />} />
          <Route path="create" element={<CreateGoal />} />
          <Route path=":goal_id" element={<ViewGoal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
