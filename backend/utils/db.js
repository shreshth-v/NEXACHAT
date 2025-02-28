import mongoose from 'mongoose';

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.NEXACHAT_DB_URL);
        console.log("Connected to NexaChat DB");
    } catch (error) {
        console.log("Error in connecting to DB");
    }
}

export default connectDb;