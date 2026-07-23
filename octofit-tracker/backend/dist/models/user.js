import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: 'member' },
    joinedAt: { type: Date, default: () => new Date() },
    goals: { type: String, default: '' },
});
export default model('User', userSchema);
