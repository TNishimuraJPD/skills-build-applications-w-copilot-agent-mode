import { Schema, model, Types } from 'mongoose';
const workoutSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    trainer: { type: String, default: '' },
    createdAt: { type: Date, default: () => new Date() },
    team: { type: Types.ObjectId, ref: 'Team' },
});
export default model('Workout', workoutSchema);
