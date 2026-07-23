import { Schema, model, Types } from 'mongoose';
const activitySchema = new Schema({
    user: { type: Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    performedAt: { type: Date, default: () => new Date() },
    notes: { type: String, default: '' },
});
export default model('Activity', activitySchema);
