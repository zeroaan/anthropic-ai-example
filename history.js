import fs from 'fs';
import { STORAGE_FILE } from './config.js';

export function loadMessages() {
  try {
    if (!fs.existsSync(STORAGE_FILE)) return [];
    const data = fs.readFileSync(STORAGE_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading messages:', error);
    return [];
  }
}

export function saveMessages(messages) {
  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(messages, null, 2));
  } catch (error) {
    console.error('Error saving messages:', error);
  }
}

export function clearChatHistory() {
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      fs.unlinkSync(STORAGE_FILE);
    }
  } catch (error) {
    console.error('Error clearing chat history:', error);
  }
}
