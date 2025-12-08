import mongoose from 'mongoose';

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/myapp';

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(dbUrl, {});
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

export const disconnectFromDatabase = async () => {
    try {
        await mongoose.disconnect();
        console.log('Disconnected from the database successfully');
    } catch (error) {
        console.error('Database disconnection error:', error);
        process.exit(1);
    }
};
