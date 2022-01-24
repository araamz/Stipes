# Stipes

A task management application built using React and Flask. The application features routing to different pages, CRUD methodology, and use of CSS media queries. The purpose of Stipes was to learn React and Flask and develop skills using newer features of JavaScript such as arrow functions and the Fetch API provided by ES6. Using the lessons learned I hope to apply them to future projects and enhance my understanding of these frameworks.

## Used Tools

Tools used to create the application frontend and backend are listed in the below list. The full requirements for the frontend are listed within _package.json_ and can be installed via `npm install`. The full requirements for the frontend are listed within _requirements.txt_ and can be installed via `pip install -r requirements.txt`.

- Frontend
  - React 17.0.2
  - React-Router 6.2.1
- Backend
  - Flask 2.0.2
  - Flask-SQLAlchemy 2.5.1

## Installing Stipes

## Frontend Design

### React Project Configuration

### Frontend Routing

### Application Styling

## Backend Design

### Database Models

### Backend Routing

The application's backend consists of ten points. The routing scheme contains two variables used to identify a specifc goal (with **goal_id**) and a specific story (with **story_id**). All goals have a child to parent relationship with a story. The routing of the backend is delineated by the following code piece below.

```
|----/api/
|    |----(story_id)/
|    |    |----goals/
|    |    |    |----(goal_id)/
|    |    |    |    |----edit/status
|    |    |    |    |----edit/content
|    |    |    |    |----delete
|    |    |    |----create
|    |    |----delete
|    |    |----edit
|    |----create
```

#### Route Descriptions

1. `[GET] /api/` is used for getting a JSON list of all story records containing a story's `content` and `id`.
   1. `[GET] /api/(story_id)` is used for getting a JSON object of the selected story (using `story_id` url parameter) record containing its `content` attribute.
      1. `[GET] /api/(story_id)/goals` is used for getting a JSON list of all goal records tied to a story record containing each goal's `content` and `id`.
         1. `[GET] /api/(story_id)/goals/(goal_id)/` is used for getting a JSON object of a goal record containing a goal's `content` and `id`.
            1. `[DELETE] /api/(story_id)/goals/(goal_id)/delete` is used for deleting the selected goal (using `goal_id` url parameter) record from a selected story record (using `story_id` url parameter).
            2. `/api/(story_id)/goals/(goal_id)/edit` is used to semantically designate routes to a goal's `status` and `content` attribute.
               1. `[PATCH] /api/(story_id)/goals/(goal_id)/edit/status` is used for patching a selected goal (using `goal_id` url parameter) record by editing its `status` attribute.
               2. `[PATCH] /api/(story_id)/goals/(goal_id)/edit/content` is used for patching a selected goal (using `goal_id` url parameter) record by editing its `content` attribute.
      2. `[DELETE] /api/(story_id)/delete` is used for deleting the selected story (using the `story_id url parameter`) record.
      3. `[PATCH] /api/(story_id)/edit` is used for patching a story record by editing its `content` attribute.
      4. `[POST] /api/(story_id)/create` is used for posting a new goal record to the selected story (using `story_id` url parameter).
   2. `[POST] /api/create` is used for posting a new story record.
