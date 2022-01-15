import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import ViewStory from "./pages/ViewStory";
import CreateStory from "./pages/CreateStory";
import ViewGoal from "./pages/ViewGoal";
import CreateGoal from "./pages/CreateGoal";
import ViewStories from "./pages/ViewStories";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ViewStories />} />
          <Route path="create" element={<CreateStory />} />
        </Route>
        <Route path="/:story_id" element={<ViewStory />}>
          <Route path="create" element={<CreateGoal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
