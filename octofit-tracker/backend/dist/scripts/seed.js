import mongoose from 'mongoose';
import User from '../models/user.js';
import Team from '../models/team.js';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Workout from '../models/workout.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            Leaderboard.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const users = await User.create([
            {
                name: 'Aiko Tanaka',
                email: 'aiko.tanaka@example.com',
                passwordHash: 'hashed_pw_1',
                role: 'member',
                goals: 'Run three 5K races this year',
            },
            {
                name: 'Miguel Santos',
                email: 'miguel.santos@example.com',
                passwordHash: 'hashed_pw_2',
                role: 'member',
                goals: 'Complete daily strength training',
            },
            {
                name: 'Sofia Lee',
                email: 'sofia.lee@example.com',
                passwordHash: 'hashed_pw_3',
                role: 'coach',
                goals: 'Help team members improve endurance',
            },
        ]);
        const teams = await Team.create([
            {
                name: 'Morning Momentum',
                description: 'Early risers focused on cardio and mobility.',
                members: [users[0]._id, users[1]._id],
            },
            {
                name: 'Weekend Warriors',
                description: 'High-energy weekend workouts and recovery sessions.',
                members: [users[1]._id, users[2]._id],
            },
        ]);
        const workouts = await Workout.create([
            {
                name: 'Sunrise HIIT Blast',
                description: '30 minutes of interval training with bodyweight exercises.',
                durationMinutes: 30,
                difficulty: 'Intermediate',
                trainer: 'Sofia Lee',
                team: teams[0]._id,
            },
            {
                name: 'Recovery Flow',
                description: 'Gentle stretching and mobility for post-workout recovery.',
                durationMinutes: 25,
                difficulty: 'Beginner',
                trainer: 'Sofia Lee',
                team: teams[1]._id,
            },
        ]);
        const activities = await Activity.create([
            {
                user: users[0]._id,
                type: 'Running',
                durationMinutes: 42,
                caloriesBurned: 520,
                performedAt: new Date(Date.now() - 1000 * 60 * 60 * 22),
                notes: 'Morning tempo run around the river.',
            },
            {
                user: users[1]._id,
                type: 'Strength Training',
                durationMinutes: 55,
                caloriesBurned: 610,
                performedAt: new Date(Date.now() - 1000 * 60 * 60 * 26),
                notes: 'Leg day with squat and deadlift focus.',
            },
            {
                user: users[2]._id,
                type: 'Yoga',
                durationMinutes: 35,
                caloriesBurned: 180,
                performedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
                notes: 'Guided recovery flow for the team.',
            },
        ]);
        const leaderboard = await Leaderboard.create([
            {
                user: users[0]._id,
                rank: 1,
                totalPoints: 1450,
            },
            {
                user: users[1]._id,
                rank: 2,
                totalPoints: 1290,
            },
            {
                user: users[2]._id,
                rank: 3,
                totalPoints: 1120,
            },
        ]);
        console.log('Database seeding complete');
        console.log({ users: users.length, teams: teams.length, workouts: workouts.length, activities: activities.length, leaderboard: leaderboard.length });
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
