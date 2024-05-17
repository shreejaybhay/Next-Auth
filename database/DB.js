import mongoose from "mongoose";

export const connect = async () => {
    if (mongoose.connections[0].readyState) {
        // If already connected, do not reconnect
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("MongoDB connected successfully");
        });
        connection.on('error', (err) => {
            console.error("MongoDB connection error:", err);
            process.exit(1);
        });
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
};
