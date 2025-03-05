import dotenv from 'dotenv';

dotenv.config();

export const MODEL = 'claude-3-haiku-20240307';
export const MAX_TOKENS = 100;
export const X_API_KEY = process.env.X_API_KEY || '';

export const STORAGE_FILE = 'chat_history.json';
