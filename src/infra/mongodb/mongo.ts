import { config } from '@/config';
import mongoose from 'mongoose';

const mongoEngine = async () => {
  const uri = config.mongoUri;

  if (!uri) throw new Error('mongo uri is missing');

  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1); // fail fast if DB is not available
  }
};

export default mongoEngine;
