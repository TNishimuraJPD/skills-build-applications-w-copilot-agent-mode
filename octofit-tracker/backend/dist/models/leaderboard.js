import { Schema, model, Types } from 'mongoose';
const leaderboardSchema = new Schema({
    user: { type: Types.ObjectId, ref: 'User', required: true },
    rank: { type: Number, required: true },
    totalPoints: { type: Number, required: true },
    updatedAt: { type: Date, default: () => new Date() },
});
export default model('Leaderboard', leaderboardSchema);
