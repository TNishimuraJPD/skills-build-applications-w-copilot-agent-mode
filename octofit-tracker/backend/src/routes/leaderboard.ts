import { Router } from 'express';
import Leaderboard from '../models/leaderboard.js';

const router = Router();

router.get('/', async (_req, res) => {
  const leaderboard = await Leaderboard.find().populate('user').sort({ rank: 1 }).lean();
  res.json({ message: 'Leaderboard endpoint', data: leaderboard });
});

export default router;
