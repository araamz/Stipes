# Stipes

A task management application built using React and Flask. The application features routing to different pages, CRUD methodology, and use of CSS media queries. The purpose of Stipes was to learn React and Flask and develop skills using newer features of JavaScript such as arrow functions and the Fetch API provided by ES6. Using the lessons learned I hope to apply them to future projects and enhance my understanding of these frameworks.

### Application Screenshots

<p align="center">
    <img src="readme_images/ViewStories.png" width="800">
</p>

**Fig. 1:** Showing the homescreen for the application. This is where the user can view their User Stories and see more information about it.

<p align="center">
    <img src="readme_images/NewStory.png" width="800">
</p>

**Fig. 2:** Showing the new story creation page. Users can create new stories from this page to be displayed within the homescreen.

<p align="center">
    <img src="readme_images/ViewGoals.png" width="800">
</p>

**Fig. 3:** Showing goals associated to each user story. This is where the user can view goals associated to a user story and quickly glance at the progress of a goal through the background color of a card. Red signifies a story is in a "to-do" state, yellow signifies a goal is in a "in-progress" state, and green signifies the goal is completed.

<p align="center">
    <img src="readme_images/EditStory.png" width="800">
</p>

**Fig. 4:** Showing the edit story page. This is where users can edit the selected user story and delete a user story with all goals associated to the selecteed story.

<p align="center">
    <img src="readme_images/CreateGoal.png" width="800">
</p>

**Fig. 5:** Showing the create goal page. This is where users can create and add new goals to the selected user story.

<p align="center">
    <img src="readme_images/ViewGoal.png" width="800">
</p>

**Fig. 6:** Showing the create goal page. This is where users can change a goal through a variety of ways. Users can change a goal's status by using the radio buttons, edit a goal, and delete a goal.

### Used Tools

Tools used to create the application frontend and backend are listed. The full requirements for the frontend are listed within _package.json_ and can be installed via `npm install`.

- Frontend
  - React 17.0.2
  - React-Router 6.2.1
- Backend
  - Flask 2.0.2
  - Flask-SQLAlchemy 2.5.1

### Installing Stipes

Installing Stipes requires the following software to be installed on the host system:

- Python 3
- Package Installer for Python (pip)
- Node Package Manager (npm)

It is recommended to install Stipes Unix-based operating system; if your using Windows please use WSL2.

1. Clone the repository with `git clone https://github.com/araamz/stipes.git`.
2. Change directory to be within the Stipes folder with `cd stipes`.
3. Within the root directory install the required node packages with `npm install`.
4. Change directory to be within the api folder with `cd api`.
5. Make a new python environment with `python3 -m venv env`.
6. Activate the virtual environment with `. env/bin/activate`.
7. Within the virtual environment, install python-dotenv with `pip install python-dotenv`.
8. Within the virtual environment, install Flask with `pip install Flask`.
9. Within the virtual environment, install Flask-SQLAlchemy with `pip install Flask-SQLAlchemy`.
10. Within the virtual environment, Launch a python shell with `python3`.
11. Within the python shell, import the database object with `from api import db`.
12. Within the python shell, create the database with `db.create_all()`.

### Starting Stipes

1. Open a terminal window within the root Stipes directory.
2. Start the react application with `npm start`.
3. Open a new terminal window within the root Stipes directory.
4. Change directory to the api folder with `cd api`.
5. Enter into the virtual environment with `. env/bin/activate`.
6. Start the flask application with `flask run`.
7. Go to `localhost:3000` in a web browser to use Stipes.

## Frontend Design

The Frontend Design of the website is composed of a page heading, navigation, and main section. The application takes advantage of outlets and views provided by the React Router to change the experience depending upon the URL. The application uses external fonts to deliver `material-icons` and `PT Sans` from Google Fonts. The application uses JavaScripts native `fetch()` API to make HTTP calls to the Flask backend to send and receive JSON objects. There is minimal error-handling with only application errors being logged to the console.

### Custom Components

Components created to encapsulate functionality and styles with most being wrappers to already created components.

- **Button**: Button does is a `<button>` element with added functionality being a rendered icon if provided to the element. The Button component has the following props `[className, onClick, icon, childern]`.
- **Card**: Card is a `<Link>` that provides a consistent styling to elements used to show user stories and goals. The Card component has the following props `[className, childern]`.
- **SectionNavLink**: SectionNavLink is a `<NavLink>` element providing consistent styling with navigation link elements with added functionality such as custom styling for a active URL. SectionNavLink passes props given to the element down to the `<NavLink>` element that ensures default functionality is not removed. The SectionNavLink component has the following props `[to, state, className, icon, childern]`.
- **Toast**: Toast is a element to deliver messages to the user if enabled through a true/false predicate. Toast element is added to a page where a toast message should appear and appends itself a block element. The Toast component has the following props `[display, childern]`.

### Application Styling

The application uses CSS to ensure consistent styling with universal styling being stored within `index.css` and custom created stylings being located within a component and page `.module.css` file. Ensuring components that use their own stylings but still retain a common theme can use CSS variables defined within `index.css`. Stylings named `*_utility` classes are used along side CSS variables to ensure a consistent experience within the application.

### Frontend Routing

The application's frontend routing uses React Router to create two differnt page with outlets being used to switch nested views in each page. The routing scheme is located within `index.js` and features use of URL parameters and an index route. The URL parameters are **story_id** and **goal_id** and used to identify goals assoicated to user stories and select user stories themselves. The index route is used to display a default view by the parent route which is displayed by the default view for `/` route being the `<App />` component. This page is used to display all user stories. The index route is also included to the second page with `/:story_id` route being the `<ViewGoals />` component. This page is used to display all the goals associated to the selected user story in the url parameter.

```
|----/
|    |----create
|    |----(story_id)/
|    |    |----edit
|    |    |----create
|    |    |----(goal_id)
```

## Backend Design

The backend uses Flask to create a REST API used to retrieve and receive JSON objects used for editing records within the provided SQLite database. The backend is divided into three seperate files used to identify the functionality of the functions within each of the files.

- `models.py` is used to define the models the default ORM will use to create the database tables and recrod attributes.
- `serializers.py` is used to define serializers used to format JSON files for a record.
- `routes.py` is used define routes and endpoints for the REST API to provide CRUD functionality.

### Database Models

The database uses SQLite with two tables stored in the database being **Story** and **Goal** records. The database file itself is named `database.db` and stored within `./api/api` directory. The models used by the ORM are defined within `models.py` with the two models having a one-to-many relationship (a story can have many goals). The models are class-based and have attributes defined within the classes. Figure 7 gives a overview of the database with a diagram of the database table.

- Story Model
  - **id (integer)**: Used to identify a story and is the primary key for a story record.
  - **content (String)**: Used to define the user story. This value can not be empty.
  - **goals (relationship)**: Used to define the one-to-many relationship between a Story and its Goals.
- Goal Model
  - **id (intger)**: Used to identify a goal and is the primary key for a goal record.
  - **content (String)**: Used to define the goal. This value can not be empty.
  - **status (String)**: Used to define the status of a goal with a one character string. "D" (To-Do) is the default value with two other values being "P" (In-Progress) and "C" (Completed).
  - **story_id (Integer)**: Used to identify the story the goal record is associted to with a foreign key value.

<p align="center">
    <img src="readme_images/database.png" width="800">
</p>

**Fig. 7:** Database models with relationships.

### Backend Routing

The application's backend consists of ten points. The routing scheme contains two variables used to identify a specifc goal (with **goal_id**) and a specific story (with **story_id**). The routes are designed to show goals have a child to parent relationship with a story.

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

- `[GET] /api/` is used for getting a JSON list of all story records containing a story's `content` and `id`.
  - `[GET] /api/(story_id)` is used for getting a JSON object of the selected story (using `story_id` url parameter) record containing its `content` attribute.
    - `[GET] /api/(story_id)/goals` is used for getting a JSON list of all goal records tied to a story record containing each goal's `content` and `id`.
      - `[GET] /api/(story_id)/goals/(goal_id)/` is used for getting a JSON object of a goal record containing a goal's `content` and `id`.
        - `[DELETE] /api/(story_id)/goals/(goal_id)/delete` is used for deleting the selected goal (using `goal_id` url parameter) record from a selected story record (using `story_id` url parameter).
        - `/api/(story_id)/goals/(goal_id)/edit` is used to semantically designate routes to a goal's `status` and `content` attribute.
          - `[PATCH] /api/(story_id)/goals/(goal_id)/edit/status` is used for patching a selected goal (using `goal_id` url parameter) record by editing its `status` attribute.
          - `[PATCH] /api/(story_id)/goals/(goal_id)/edit/content` is used for patching a selected goal (using `goal_id` url parameter) record by editing its `content` attribute.
    - `[DELETE] /api/(story_id)/delete` is used for deleting the selected story (using the `story_id url parameter`) record.
    - `[PATCH] /api/(story_id)/edit` is used for patching a story record by editing its `content` attribute.
    - `[POST] /api/(story_id)/create` is used for posting a new goal record to the selected story (using `story_id` url parameter).
  - `[POST] /api/create` is used for posting a new story record.

## Additional Documentation

There is comments used throughout the project containing relevant informaiton to the design of the application not mentioned in the `README.md`.

- `./api/api/__init__.py`
- `./api/api/models.py`
- `./api/api/routes.py`
- `./src/pages/CreateGoal/CreateGoal.js`
- `./src/pages/CreateStory/CreateStory.js`
- `./src/pages/ViewStory/ViewStory.js`
- `./src/pages/EditStory/EditStory.js`
- `./src/index.js`
