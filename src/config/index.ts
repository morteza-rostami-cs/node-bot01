import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || '',
  mongoUri: process.env.MONGO_URI!,
  redis: {
    host: process.env.REDIS_HOST!,
    port: Number(process.env.REDIS_PORT || 6379),
    password: process.env.REDIS_PASS || undefined,
  },
  auth: {
    accessSecret: process.env.ACCESS_SECRET || '',
    refreshSecret: process.env.REFRESH_SECRET || '',
  },
  chroma: {
    url: process.env.CHROMA_URL!,
    apiKey: process.env.CHROMA_API_KEY,
  },
  llm: {
    openaiKey: process.env.OPENAI_API_KEY,
    ollamaUrl: process.env.OLLAMA_API_URL,
    ollamaModel: process.env.OLLAMA_MODEL || 'gpt4',
    embedModel: process.env.EMBED_MODEL || '',
  },
  telegram: {
    token: process.env.TELEGRAM_BOT_TOKEN || '',
  },
};
