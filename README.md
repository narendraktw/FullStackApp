# FullStackApp

This repository contains the code for my MERN stack FullStackApp project, featuring authentication using JWT and cookie-based sessions.

## Technologies Used

- **Frontend**:
  - React.js for building user interfaces.
  - Redux for state management.
  - Redux Saga for managing side effects.
  - React Router for client-side routing.
  - React Hook Form for form validation.
  - Material-UI for UI components.
  - Axios for making API requests.
  - Zod for schema validation.
  
- **Database**:
  - MongoDB for storing data.
  - Mongoose for interacting with MongoDB.  

- **Backend**:
  - Node.js and Express.js for the server.
  - MongoDB as the database using Mongoose for ODM.
  - Authentication using JWT tokens and cookie-based sessions.
  
## Installation

To get started, clone the repository and install dependencies for both frontend and backend:

```bash
git clone https://github.com/narendraktw/FullStackApp.git
cd FullStackApp

# Install server-side dependencies
cd backend
bun install

# Start the server
bun start

# Install client-side dependencies
cd frontend
bun install

# Start the frontend
bun run dev


