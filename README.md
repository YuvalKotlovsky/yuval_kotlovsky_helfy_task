# Setup and installation instructions:
    cd into the backend folder and run npm install. then run npm run start.
    you can also run npm run dev in order to get hot reloading. the server will be running in port 4000.

    in a different terminal cd into the frontend folder and run npm run dev. 

# How to run both frontend and backend
    after running npm run start in the backend directory the server will be listening in port 4000.
    after running npm run dev in the frontend directory the frontend app should be running in 
    port 5173.

# API Documentation
    base url is http://localhost:4000/api/tasks

    task object: { id, title, description, completed, createdAt, priority }
    priority can be "low", "medium", or "high"
    title and priority are required when creating a task, description is optional

    GET /api/tasks - get all tasks
    POST /api/tasks - create a task, send { title, priority, description? }
    PUT /api/tasks/:id - update a task, send whichever fields you want to change (title, description, priority)
    PATCH /api/tasks/:id/toggle - toggle completed status
    DELETE /api/tasks/:id - delete a task

# Time spent on each part
    Backend: 1h
    Frontend: 2h
    Integration: 30min
    Testing: 30min

