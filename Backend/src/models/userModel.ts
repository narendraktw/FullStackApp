import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Interface for user data
interface User {
	email: string;
	password: string;
}

// Create a new schema for users
const userSchema = new mongoose.Schema<User>({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt(10); // Generate salt for hashing
	this.password = await bcrypt.hash(this.password, salt); // Hash password using salt
	next(); // Continue with saving process
});

// Export the user model
export default mongoose.model<User>('User', userSchema);
