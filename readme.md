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

## Installation
1. Clone the Repository
```bash
https://github.com/Souvik-Cyclic/task-management-system.git
```
2. Navigate to the project directory
```bash
cd task-management-system
```

## Running the Application
1. Start Docker
```
Ensure Docker is running on your machine.
```
2. Build with Docker Compose
```bash
docker compose build
```
3. Run with Docker Compose
```bash
docker compose up
```

The application will be accessible at `http://localhost:3000`.

## API Endpoints
