# Task Management System

## Project Overview
The Task Management System is a RESTful API designed to optimize task management processes. Built with Node.js and Express.js, this system facilitates efficient task handling with support for user authentication, task CRUD operations, and role-based access control (RBAC). The system is containerized using Docker for easy deployment and scalability.

## Features
- User Authentication: Secure JWT-based authentication for user verification.
- Role-Based Access Control (RBAC): Differentiated access for Admin and User roles.
- Task Management: Full CRUD capabilities for managing tasks.
- Task Assignment: Assign tasks to users for better task distribution.
- Filtering and Searching: Advanced task filtering and search functionalities.
- Dockerized Environment: Simplified deployment and environment setup.

## Directory Structure
```
├── config
│   └── dbConfig.js             # Database configuration
├── controllers
│   ├── taskController.js       # Task controller logic
│   └── userController.js       # User controller logic
├── middleware
│   └── authMiddleware.js       # Authentication middleware
├── models
│   ├── taskModel.js            # Task schema/model
│   └── userModel.js            # User schema/model
├── routes
│   ├── taskRoutes.js           # Routes related to tasks
│   └── userRoutes.js           # Routes related to users
├── node_modules                # Node.js modules
├── .dockerignore               # Docker ignore file
├── .env                        # Environment variables
├── .gitignore                  # Git ignore file
├── docker-compose.yml          # Docker Compose file
├── Dockerfile                  # Dockerfile for building the image
├── index.js                    # Entry point of the application
├── package-lock.json           # Package lock file
├── package.json                # Project dependencies
└── README.md                   # Project documentation

```

## Prerequisites
- Docker: Ensure Docker is installed on your machine.
- Postman: Optional, but recommended if you want to test the API efficiently.

## Installation
1. Clone the Repository
```bash
git clone https://github.com/Souvik-Cyclic/task-management-system.git
```
2. Navigate to the project directory
```bash
cd task-management-system
```
## Running the Application
1. Start Docker
``` plaintext
Ensure Docker is running on your machine.
```
2. Build with Docker Compose
```bash
docker compose build
```
It may take some time depending on your machine and internet connection. Please allow it to complete.

3. Run with Docker Compose
```bash
docker compose up
```

## API Endpoints

### User Management

- `POST /api/register`: Register a new user
- `POST /api/login`: Authenticate user and get token
- `GET /api/users`: Fetch all users (requires authentication)
- `GET /api/users/:id`: Fetch a specific user by ID (requires authentication)
- `PUT /api/users/:id`: Update a user's details (requires authentication)
- `DELETE /api/users/:id`: Delete a user (requires authentication)
- `PUT /api/users/:id/password`: Change a user's password (requires authentication)

### Task Management

- `POST /api/tasks`: Create a new task (requires authentication)
- `GET /api/tasks`: Get all tasks assigned to the authenticated user
- `PUT /api/tasks/:id`: Update a specific task (requires authentication)
- `DELETE /api/tasks/:id`: Delete a specific task (requires authentication)
- `GET /api/tasks/all`: Get all tasks in the system (requires authentication)
- `GET /api/tasks/user/:id`: Get all tasks assigned to a specific user (requires authentication)
- `PUT /api/tasks/:id/assign`: Assign a task to a user (requires authentication)

Note: All endpoints except `/register` and `/login` require a valid JWT token in the Authorization header.

API Documentation : [Link](https://documenter.getpostman.com/view/36544059/2sAXjDevcF)
