import Mongoose from "mongoose";


const connectDB = async () => {
  console.log(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_NAME);
  try {
    await Mongoose.connect(`mongodb+srv://serhat:jXgcx2Mu1r3ojLww@cluster0.9jvil.mongodb.net/zufindb`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    Mongoose.connection.on('error', (err) => {
      console.error('Error connecting to MongoDB:', err);
    });

    Mongoose.connection.on('disconnected', () => {
      console.log('Disconnected from MongoDB');
    });

    process.once('SIGINT', async () => {
      try {
        await Mongoose.connection.close();
        console.log('MongoDB connection closed due to application termination');
        process.exit(0);
      } catch (err) {
        console.error('Error closing MongoDB connection:', err);
        process.exit(1);
      }
    });

  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

export { connectDB };
