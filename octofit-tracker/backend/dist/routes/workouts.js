import { Router } from 'express';
import Workout from '../models/workout.js';
const router = Router();
router.get('/', async (_req, res) => {
    const workouts = await Workout.find().populate('team').lean();
    res.json({ message: 'List workouts endpoint', data: workouts });
});
router.post('/', async (req, res) => {
    const workout = await Workout.create(req.body);
    res.status(201).json({ message: 'Create workout endpoint', workout });
});
export default router;
