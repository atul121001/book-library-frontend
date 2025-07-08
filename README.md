# Book Library Frontend

This is the frontend application for the Book Library. It's built with React and uses Tailwind CSS for styling.

## Prerequisites

- Node.js (v14 or higher)
- Backend API running (see backend project)

## Installation

1. Clone the repository
2. Navigate to the frontend directory:
```
cd standalone/frontend
```
3. Install dependencies:
```
npm install
```

## Configuration

The API URL is configured in `src/services/bookService.js`. By default, it points to `http://localhost:3001/api`. Update this if your backend is running on a different URL.

## Running the Application

To start the development server:

```
npm start
```

The application will be available at http://localhost:3000.

## Building for Production

To create a production build:

```
npm run build
```

This will create a `build` directory with optimized production files.

## Features

- View all books in the library
- Add new books
- Mark books as read/unread
- Delete books
- Filter books by status (read/unread)
- Search books by title or author

## Technologies Used

- React
- Tailwind CSS
- Axios for API requests 