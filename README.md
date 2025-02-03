# MERN Stack Blog Application

This is a full-stack blog application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application allows users to create, read, update, and delete blog posts, with additional features like code syntax highlighting, cover image upload, and a save-for-later functionality.

## Features

- **CRUD Operations**: Full CRUD (Create, Read, Update, Delete) functionality for blog posts.
- **Authentication & Authorization**: JWT-based authentication ensures secure user login and authorization, allowing only the author to edit or delete their posts.
- **Code Syntax Highlighting**: Integrated syntax highlighting for code snippets in blog posts.
- **Cover Image Upload**: Users can upload cover images for their blog posts.
- **Save-for-Later**: Users can bookmark blog posts to read later.
- **Dynamic & Responsive UI**: Built with React.js and Tailwind CSS for a consistent and responsive design across all devices.
- **Efficient Data Fetching**: Utilized TanStack Query (formerly React Query) for optimized API calls, reducing server load and improving performance.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **State Management**: Redux Toolkit
- **Data Fetching & Synchronization**: TanStack Query (for efficient API calls, caching, and server-state management)
- **Syntax Highlighting**: A library like `highlight.js`
- **Image Upload**: A service like Imagekit.io
