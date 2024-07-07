import mongoose, { Mongoose } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config(); // load environment variables from .env file.
const MongoUrl = process.env.MONGO_URL || '';

export const connectToDatabase = async (): Promise<Mongoose> => {
	try {
		const response = await mongoose.connect(MongoUrl);
		console.log('Connected to MongoDB database');
		return response;
	} catch (err) {
		console.error('Error connecting to MongoDB:', err);
		throw err; // Re-throw the error to be handled appropriately
	}
};

// Optional: Define a function to close the Mongoose connection
export const closeDatabaseConnection = async (
	mongoose: Mongoose
): Promise<void> => {
	await mongoose.connection.close();
	console.log('MongoDB database connection closed');
};
