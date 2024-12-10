Project Setup Guide
Prerequisites
Node.js (v18+) and npm installed.
MongoDB running locally or a MongoDB URI to connect to.
1. Clone the Repository
Clone the repository to your local machine:

bash
Copy code
git clone <repository-url>
cd <project-directory>
2. Backend Setup
Step 1: Install Dependencies
Navigate to the server directory and install the required dependencies:

bash
Copy code
cd server
npm install
Step 2: Set Node Version
Before running any scripts, ensure you're using Node.js v18+ by running the following command:

bash
Copy code
nvm use 18
Step 3: Create .env File
Create a .env file in the server directory and add the following environment variables:

env
Copy code
PORT=<desired-port>
MONGO_URI=<your-mongo-uri>
Replace <desired-port> with the port number you want the backend to run on.
Replace <your-mongo-uri> with your MongoDB URI (e.g., mongodb://localhost:27017/your-db).
Step 4: MongoDB Product Structure
The product structure in MongoDB should follow this format:

json
Copy code
{
  "_id": "6751ad02e7b401dc9029e26d",
  "productId": 13039983,
  "images": "https://cdn1.coutloot.com/sell/image_zkxrl1mjqj9_1733405804288.jpeg",
  "title": "Grey & White Running Shoes",
  "description": "Give yourself the advantage of comfortable feet while you flaunt your style. In these shoes from Hot Style, you can make an impression. The popular brand, Hot Style, offers stylish footwear.",
  "categoryName": "Running & Sports Shoes"
}
Step 5: Start the Backend
Run the following command to start the backend:

bash
Copy code
npm run dev
3. Frontend Setup
Step 1: Install Dependencies
Navigate to the client directory and install the required dependencies:

bash
Copy code
cd ..
cd client
npm install
Step 2: Set Node Version
Before running any scripts, ensure you're using Node.js v18+ by running the following command:

bash
Copy code
nvm use 18
Step 3: Create .env File
Create a .env file in the client directory and add the following environment variable:

env
Copy code
VITE_API_BASE_URL=http://localhost:<port-from-backend>
Replace <port-from-backend> with the port you set in the backend .env file.
Step 4: Start the Frontend
Run the following command to start the frontend:

bash
Copy code
npm run start
Node Version Requirement
Make sure you are using Node.js v18+.

To check your Node.js version, run:

bash
Copy code
node -v
If you are using an older version, you can update Node.js to v18+ using the following methods:

Using nvm (Node Version Manager):
bash
Copy code
nvm install 18
nvm use 18
Using Homebrew (macOS):
bash
Copy code
brew install node@18
Summary
Clone the repository and install dependencies in both the server and client directories.
Before starting the backend and frontend, run nvm use 18 to ensure Node.js v18+ is being used.
Set up .env files for both the backend and frontend with the appropriate configurations.
Start the backend with npm run dev and the frontend with npm run start.
