Task Management System
A simple Task Management System built with Node.js, React, SQLite, and Tailwind CSS. This project enables users to create, view, update, delete, and filter tasks by status (Pending or Completed).

Features
CRUD Operations: Create, read, update, and delete tasks.
Filter by Status: Toggle between viewing tasks by Pending, Completed, or All.
Responsive UI: Built with React and styled using Tailwind CSS.
SQLite Database: Tasks are stored in a lightweight database.
API Integration: RESTful API using Node.js and Express.js.
Technologies Used
Frontend: React, Tailwind CSS
Backend: Node.js, Express.js
Database: SQLite
Prerequisites
Make sure you have the following installed on your machine:

Node.js (v16 or higher)
npm (Node Package Manager)
Git (optional, for cloning the repository)
Installation
Follow these steps to set up and run the project locally:

1. Clone the Repository (Optional)
If using Git:

git clone <repository-url>
cd <repository-folder>
Or manually download the project folder.

2. Set Up the Backend
Navigate to the backend folder (or wherever your server files are located) and install dependencies:

cd backend
npm install
Set Up the Database:
The SQLite database will initialize automatically when the server starts. The database file (tasks.db) will be created in the backend directory.

3. Start the Backend Server
Run the backend server:


node server.js
By default, the backend runs on http://localhost:5000.

4. Set Up the Frontend
Navigate to the frontend folder (or wherever your React files are located):


cd ../frontend
npm install

5. Start the Frontend
Run the React app:
npm start
By default, the app runs on http://localhost:3000.

Usage
Open your browser and navigate to http://localhost:3000.
Add Tasks: Use the "Add Task" form to create new tasks.
View Tasks: View the list of tasks displayed below.
Edit Tasks: Click the Edit button to modify task details.
Delete Tasks: Click the Delete button to remove a task.
Filter Tasks: Use the toggle button to filter tasks by Pending, Completed, or All.

Project Structure:

project-folder/
│
├── backend/                 # Backend (Node.js + SQLite)
│   ├── server.js            # Main backend server file
│   ├── database.js          # SQLite database setup
│   └── package.json         # Backend dependencies
│
├── frontend/                # Frontend (React + Tailwind CSS)
│   ├── src/
│   │   ├── components/      # React components (CreateTodo, TodoList, etc.)
│   │   ├── App.js           # Main React component
│   │   └── index.js         # React app entry point
│   └── package.json         # Frontend dependencies
│
└── README.md                # Project documentation
APIs
1. Create a Task
POST /tasks
Request body:

json
{
    "title": "Sample Task",
    "description": "Task description",
    "due_date": "YYYY-MM-DD",
    "status": "Pending"
}
2. Get All Tasks
GET /tasks

3. Update a Task
PUT /tasks/:id
Request body:

json

{
    "title": "Updated Task",
    "description": "Updated description",
    "due_date": "YYYY-MM-DD",
    "status": "Completed"
}
4. Delete a Task
DELETE /tasks/:id

Future Enhancements (Optional)
Add user authentication for managing tasks.
Include drag-and-drop reordering for tasks.
Deploy the project to a cloud platform like Heroku, Vercel, or AWS.
Author
Piyush Digraskar
Feel free to reach out for suggestions or improvements.

License
This project is open-source and free to use.