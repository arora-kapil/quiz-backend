# Trivia Quiz App
This is a React Native Trivia Quiz App that fetches quiz questions from the Open Trivia Database (OpenTDB). Users can select a category and difficulty level to start the quiz. At the end of each quiz, the user's score is saved, and they can view the leaderboard to compare their scores with others.

## Features
* Category and Difficulty Selection: Users can select from various quiz categories and choose a difficulty level (easy, medium, hard).
* Randomized Questions: Each quiz consists of 10 randomly selected multiple-choice questions.
* Score Submission: After completing the quiz, users can submit their score along with their username.
* Leaderboard: The app displays the top 10 scores for each category and difficulty.
* Responsive UI: The app is designed to be visually appealing with a clean, user-friendly interface.

## Screenshots

<img src="https://github.com/user-attachments/assets/1da64f42-c474-4d55-bfbe-a81ab03639f0" width=250 height=450>
<img src="https://github.com/user-attachments/assets/d85fbb2e-8aa6-4cdf-baa5-7d2994fe55c2" width=250 height=450>
<img src="https://github.com/user-attachments/assets/56e9f867-912a-440c-b900-2fc30e4bc3fc" width=250 height=450>
<img src="https://github.com/user-attachments/assets/3b7bcb82-ba64-4a9f-beb8-b10675ef087c" width=250 height=450>
<img src="https://github.com/user-attachments/assets/37ad887a-fa90-4ba4-a314-5c2a5c7966e1" width=250 height=450>


## Tech Stack
### Frontend:
* React Native: For building the mobile interface.
* Axios: To handle API requests to OpenTDB and the backend.
* React Native Picker: For category and difficulty selection.
* React Native Components: Button, Text, TextInput, etc.

### Backend:
* Node.js & Express: For handling API requests.
* MySQL (with Sequelize): To store and retrieve scores and leaderboard data.
* Open Trivia Database (OpenTDB): For fetching quiz questions.


## How It Works
### App Structure:
#### Quiz Setup Screen:

* Users select a quiz category and difficulty.
* Enter a username before starting the quiz.
* Options to either start the quiz or view the leaderboard.


#### Quiz Screen:
* Displays a multiple-choice question with randomized answer order.
* Updates the score after each question.
* After answering all questions, the app calculates the final score.

#### Score Submission:
* At the end of the quiz, the app sends the user's score, category, and difficulty to the backend.
* The score is saved in the MySQL database.


#### Leaderboard:
* Displays the top 10 scores for the selected category and difficulty.
* Users can view the leaderboard before starting a quiz.


## API Endpoints
* GET /categories: Fetches all available quiz categories from OpenTDB.
* GET /quiz: Fetches 10 quiz questions based on selected category and difficulty.
* POST /save-score: Submits the user's quiz score to the backend.
* GET /leaderboard: Fetches the leaderboard for a specific category and difficulty.

## Installation & Setup
### Prerequisites
* Node.js and npm installed on your machine.
* MySQL server for database setup.


### Backend Setup
* Clone the repository.
* Navigate to the backend directory and install dependencies: <br>
cd backend <br>
npm install
* Create a .env file with your MySQL credentials: <br>
DB_NAME=your_database_name <br>
DB_USER=your_mysql_username <br>
DB_PASSWORD=your_mysql_password <br>
DB_HOST=localhost <br>
PORT=5000
* Start the server: <br>
npm start


### Frontend Setup
* Navigate to the frontend directory and install dependencies: <br>
cd frontend <br>
npm install
* Ensure your backend server URL is set correctly in the API_BASE_URL constant.
* Run the app on a simulator or physical device: <br>
npx react-native run-android <br>
// or <br>
npx react-native run-ios
