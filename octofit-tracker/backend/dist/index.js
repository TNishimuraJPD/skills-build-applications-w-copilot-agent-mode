import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import './config/database.js';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';
const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);
app.get('/', (_req, res) => {
    res.json({ message: 'OctoFit Tracker backend is running.', apiUrl });
});
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', port, apiUrl, mongoUri });
});
mongoose.connection.once('open', () => {
    console.log('MongoDB connection is open.');
});
mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
app.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`);
    console.log(`API URL: ${apiUrl}`);
});
