<details>
<summary>Click to expand full README content</summary># Scalable Job Importer with Queue Processing & History Tracking

This project implements a scalable system to import job feeds from external APIs, process them using a Redis-based queue system (BullMQ), store them in MongoDB, and log the import history for tracking purposes. It includes a backend (Node.js + Express) and a frontend (Next.js) for administrative UI.

## Features

### Backend Features

#### Job API Integration:
- Parses XML job feeds into JSON.
- Imports jobs from multiple external APIs and handles insertion/updating into MongoDB.
- Scheduled hourly imports using a cron job.

#### Queue-Based Processing:
- Uses Redis and BullMQ for background processing.
- Workers process jobs with configurable concurrency.
- Handles failed jobs (e.g., invalid data or DB errors).

#### Import History Tracking:
- Logs import statistics such as `totalFetched`, `newJobs`, `updatedJobs`, `failedJobs`, etc.
- Tracks each API feed separately for clear monitoring.

### Frontend Features

#### Admin Dashboard:
- Displays job import logs for tracking.
- Provides insights into total jobs fetched, new/updated counts, and failure reasons.

#### Designed with Next.js:
- Fast, scalable, and optimized React-based framework.

## Technologies Used

**Backend:** Node.js, Express.js, BullMQ, Redis, Mongoose, MongoDB, Cron Jobs  
**Frontend:** Next.js (React Framework)  
**Queue Manager:** Redis (Using BullMQ)

## Project Structure

/client
    /components        # React components for Admin UI
    /pages             # Routes for the Admin Dashboard
    /utils             # Utility functions
/server
    /controllers       # API controllers
    /services          # Business logic services
    /workers           # Queue worker processes
    /models            # MongoDB schemas
    /routes            # HTTP API routes
    /config            # Application configuration
    /helpers           # Helper utilities (e.g., XML parsing)
/docs
README.md             # Project setup and usage


README.md          # Project setup and usage

## Getting Started

### Prerequisites

- Install Node.js (>=16.x).
- Install Redis (Locally or via Redis Cloud).
- Install MongoDB (Locally or via MongoDB Atlas).

### Setup Instructions

**Step 1: Clone the Repository**
```bash
git clone <repository_url>
cd <repository_name>

Step 2: Configure Environment Variables

Backend Environment Variables (/server/.env):

PORT=5000
MONGO_URI=mongodb://localhost:27017/job_importer
REDIS_URI=redis://localhost:6379

Frontend Environment Variables (/client/.env):

NEXT_PUBLIC_API_URL=http://localhost:5000/api

Step 3: Install Dependencies

Backend (Server):

cd /server
npm install

Frontend (Client):

cd /client
npm install

Step 4: Start Redis Locally

redis-server

Step 5: Start MongoDB Locally

mongod

Step 6: Run Backend and Frontend Services

Run the Backend (Server):

cd /server
npm start
# OR use Nodemon for hot reload
npx nodemon index.js

Backend runs on: http://localhost:5000

Run the Frontend (Client):

cd /client
npm run dev

Frontend runs on: http://localhost:3000

Step 7: Test Backend and Frontend

Admin Dashboard: http://localhost:3000
Backend API: http://localhost:5000/api

Use Postman or curl to test API endpoints:

Import Jobs:


curl -X POST http://localhost:5000/api/import

Fetch Import Logs:


curl -X GET http://localhost:5000/api/logs

Key API Endpoints

POST /api/import

Manually triggers the job import process.

Response Example:

{
  "message": "Job imports completed",
  "logs": [
    {
      "url": "https://jobicy.com/?feed=job_feed",
      "timestamp": "2023-10-01T12:00:00.000Z",
      "totalFetched": 50,
      "totalImported": 45,
      "newJobs": 40,
      "updatedJobs": 5,
      "failedJobs": 5,
      "failureReasons": ["Validation error", "Duplicate key"]
    }
  ]
}

GET /api/logs

Fetches historical import logs.

Response Example:

{
  "logs": [
    {
      "url": "https://jobicy.com/?feed=job_feed",
      "timestamp": "2023-10-01T12:00:00.000Z",
      "totalFetched": 50,
      "totalImported": 45,
      "newJobs": 40,
      "updatedJobs": 5,
      "failedJobs": 5,
      "failureReasons": ["Validation error", "Duplicate key"]
    }
  ]
}

Known Issues and Debugging

Redis Connection Issues:

Ensure Redis is running locally.

Check REDIS_URI in .env.


MongoDB Connection Issues:

Ensure MongoDB is running or use Atlas.

Check MONGO_URI in .env.


Worker Error (requires connection):

Ensure BullMQ workers are connected:

const connection = new Redis(process.env.REDIS_URI || 'redis://localhost:6379');



Future Enhancements

Microservices Architecture

Real-time Updates (Socket.IO)

Retry Logic with Exponential Backoff

Production Deployment: Render, Vercel, AWS

Cloud-hosted MongoDB & Redis

