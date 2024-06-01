# BlogHub

BlogHub is a basic blogging platform backend built with Node.js,Express,and MongoDB.It allows users to sign up,log in,create,read,update,and delete blog posts.This project is a personal exercise in building a RESTful API with a focus on core functionality.

## Features

- **User Authentication**: Sign up and log in with password hashing.
- **CRUD for Blogs**: Create,Read,Update,and Delete blog posts.
- **User Management**: View and manage user accounts.
- **Blog Associations**: Each user can have multiple blogs.
- **Basic Error Handling**: Ensures smooth operation.

## API Endpoints

### User Routes

- `GET /api/users`: Get all users.
- `POST /api/users/signup`: Sign up a new user.
- `POST /api/users/login`: Log in an existing user.
- `DELETE /api/users`: Delete a user.

### Blog Routes

- `GET /api/blogs`: Get all blogs.
- `POST /api/blogs/add`: Add a new blog.
- `PUT /api/blogs/update/:id`: Update an existing blog.
- `GET /api/blogs/:id`: Get a blog by ID.
- `DELETE /api/blogs/:id`: Delete a blog by ID.
- `GET /api/blogs/user/:id`: Get blogs by user ID.

## Technologies Used

- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**
- **bcryptjs**
- **dotenv**
- **Nodemon**


