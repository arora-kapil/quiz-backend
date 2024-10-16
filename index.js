const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Set up Sequelize connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

// Define the Score model
const Score = sequelize.define('Score', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  difficulty: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
});

// Sync the model with the database
sequelize.sync()
  .then(() => console.log('Database & tables created!'))
  .catch(err => console.error('Error syncing database:', err));

// Test the database connection
sequelize.authenticate()
  .then(() => console.log('Connection to the database has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

// Basic route
app.get('/', (req, res) => {
  res.send('Quiz API is running');
});

app.get('/quiz', async (req, res) => {
  const { category, difficulty } = req.query;

  try {
    const response = await axios.get('https://opentdb.com/api.php', {
      params: {
        amount: 10,
        category,
        difficulty,
        type: 'multiple',
      },
    });

    const questions = response.data.results;
    res.json(questions);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).send('Error fetching quiz data');
  }
});

app.get('/categories', async (req, res) => {
  try {
    const response = await axios.get('https://opentdb.com/api_category.php');
    const categories = response.data.trivia_categories;
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).send('Error fetching categories');
  }
});

app.get('/difficulty', (req, res) => {
  const difficulties = ['easy', 'medium', 'hard'];
  res.json(difficulties);
});

// New route to save score
app.post('/save-score', async (req, res) => {
  const { username, score, category, difficulty } = req.body;
  
  try {
    const newScore = await Score.create({ username, score, category, difficulty });
    res.status(201).json({ message: 'Score saved successfully', score: newScore });
  } catch (error) {
    console.error('Error saving score:', error);
    res.status(500).send('Error saving score');
  }
});

// New route to get leaderboard
app.get('/leaderboard', async (req, res) => {
  const { category, difficulty } = req.query;
  
  try {
    const leaderboard = await Score.findAll({
      where: { category, difficulty },
      order: [['score', 'DESC']],
      limit: 10
    });
    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).send('Error fetching leaderboard');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});