NexaChat

NexaChat is a real-time chat application built using the MERN stack (MongoDB, Express, React, Node.js) with WebSocket support via Socket.io. It allows users to engage in one-on-one and group chats with real-time updates and additional features like AI-powered responses.

🚀 Features

🔐 User Authentication: Secure login and registration with JWT authentication.
💬 One-on-One & Group Chats: Users can chat individually or in groups.
👥 Group Management: Group admins can add/remove users and update group information.
⚡ Real-Time Messaging: Messages are updated instantly using WebSockets.
🔔 Message Alerts: Users receive real-time alerts for new messages.
✍️ Typing Indicator: Shows when a user is typing.
📎 Media Sharing: Supports text, images, and files.
📥 Downloadable Files: Users can download shared images and files.
🤖 Real-Time AI Chat: AI-powered chat responses using Google Gemini.

🛠 Tech Stack

🎨 Frontend: React ⚛️, Redux Toolkit, Tailwind CSS 🎨, Axios ⚡
🖥 Backend: Node.js 🟢, Express 🚀, MongoDB 🍃, Socket.io 🔌, Cloudinary ☁️ (for image uploads)
💾 Database: MongoDB (MongoDB Atlas for deployment)
🚀 Deployment: Vercel (Frontend) 🔼, Render (Backend) 🛠, MongoDB Atlas (Database) 🗄️

📥 Installation

Prerequisites

Node.js & npm
MongoDB Atlas account
Cloudinary account for image uploads

Steps to Run Locally

1. Clone the repository:

   git clone https://github.com/shreshth-v/NEXACHAT.git
   cd NEXACHAT

2. Install dependencies for frontend & backend:

   cd frontend
   npm install
   cd ../backend
   npm install

3. Set up environment variables:

   Create .env files in both frontend and backend folders.
   Add the necessary credentials (MongoDB URI, JWT secret, Cloudinary API keys, etc.).

4. Run the backend server:

   For development:
   cd backend
   npm run dev

   For production:
   cd backend
   npm start

5. Run the frontend server:

   For development:
   cd frontend
   npm run dev

   For production:
   cd frontend
   npm run build
   npm run serve

6. Open the application in the browser:
   http://localhost:5173
