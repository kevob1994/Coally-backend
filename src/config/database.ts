import mongoose from 'mongoose';
import { config } from '.';

const connectDB = async () => {
    try {
        await mongoose.connect(config.database.url);
        mongoose.set('strictQuery', true);
        console.log('MongoDB Connected...');
    } catch (error){
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;
