# React Blog App with MongoDB Atlas

A modern, full-featured blog application built with React, TypeScript, and MongoDB Atlas Data API.

## Features

- **Authentication**: Demo login system with localStorage persistence
- **Blog Management**: Create, read, and delete blog posts
- **Category Filtering**: Filter posts by Tech, Lifestyle, Education, Health, or Other
- **Rich UI**: Beautiful, responsive design with Tailwind CSS
- **Real-time Updates**: Instant UI updates after creating or deleting posts
- **Toast Notifications**: Success/error feedback for all operations

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Database**: MongoDB Atlas (via Data API)
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## API Setup

This application now includes a complete Express.js API backend that handles authentication and blog post management.

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd react-blog-app
npm install
```




### 3. Run the Application

You have several options to run the application:

**Option 1: Run both frontend and backend together (Recommended)**
```bash
npm run dev:full
```

**Option 2: Run them separately**

Terminal 1 (Backend):
```bash
npm run dev:server
```

Terminal 2 (Frontend):
```bash
npm run dev
```

The backend API will run on `http://localhost:5000` and the frontend on `http://localhost:5173`.

### 4. MongoDB Atlas Setup (Alternative)

If you want to use MongoDB Data API instead of the Express backend:

1. **Create a MongoDB Atlas Account**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Enable Data API**:
   - Go to your Atlas dashboard
   - Navigate to "Data API" in the left sidebar
   - Click "Create API Key"
   - Copy the API Key and App ID



## Project Structure

```
src/
├── components/
│   ├── BlogForm.tsx      # Create new blog posts
│   ├── BlogList.tsx      # Display and filter blog posts
│   └── ProtectedRoute.tsx # Route protection component
├── contexts/
│   └── AuthContext.tsx   # Authentication context
├── pages/
│   ├── BlogDashboard.tsx # Main dashboard page
│   ├── BlogDetail.tsx    # Individual blog post view
│   └── LoginPage.tsx     # Login interface
├── services/
│   └── blogApi.ts        # MongoDB Data API integration
└── App.tsx               # Main app component with routing
```

## MongoDB Data API Setup Guide

### Step 1: Enable Data API in Atlas

1. Log into your MongoDB Atlas dashboard
2. Navigate to "Data API" in the left sidebar
3. Click "Enable the Data API"
4. Create an API Key:
   - Click "Create API Key"
   - Give it a name (e.g., "Blog App API Key")
   - Copy the generated API Key

### Step 2: Get Your App ID

1. In the Data API section, you'll see your App ID
2. Copy this App ID

### Step 3: Configure Network Access (if needed)

1. Go to "Network Access" in the left sidebar
2. Ensure your IP address is whitelisted, or add `0.0.0.0/0` for development

### Step 4: Update Environment Variables

Replace the values in your `.env` file with your actual credentials.

## API Endpoints

The app uses MongoDB Data API with these operations:

- **Create Post**: `insertOne` to add new blog posts
- **Get Posts**: `find` to retrieve all posts with optional category filtering
- **Get Single Post**: `findOne` to retrieve a specific post by ID
- **Delete Post**: `deleteOne` to remove a blog post

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features in Detail

### Authentication
- Demo login system with hardcoded credentials
- JWT-like session management using localStorage
- Protected routes that redirect to login if not authenticated
- Logout functionality that clears session data

### Blog Management
- **Create Posts**: Rich form with title, category selection, and content
- **View Posts**: Card-based layout with post previews
- **Filter Posts**: Dropdown to filter by category
- **Delete Posts**: One-click delete with confirmation
- **Read Full Posts**: Detailed view page for complete post content

### UI/UX Features
- Responsive design that works on all devices
- Loading states for all async operations
- Error handling with user-friendly messages
- Smooth animations and transitions
- Modern gradient designs and glass-morphism effects

## Troubleshooting

### Common Issues

1. **Posts not saving**: Check your MongoDB API key and App ID in `.env`
2. **CORS errors**: Ensure your MongoDB cluster allows connections from your domain
3. **Login not working**: Verify you're using the exact demo credentials
4. **Build errors**: Make sure all dependencies are installed with `npm install`

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Verify your MongoDB Atlas configuration
3. Ensure all environment variables are set correctly
4. Check that your MongoDB cluster is running and accessible

## License

This project is open source and available under the [MIT License](LICENSE).
