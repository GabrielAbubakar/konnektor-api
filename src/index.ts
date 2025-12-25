import { connectToDatabase } from './app/config/db.ts';
import app from './server.ts';

// Connect to the database before starting the server
async function startServer() {
    try {
        await connectToDatabase();
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Connected to DB and server running on port ${process.env.PORT || 8000}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
}

startServer();
