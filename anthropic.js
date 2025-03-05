import Anthropic from '@anthropic-ai/sdk';
import { MODEL, MAX_TOKENS, X_API_KEY } from './config.js';
import { loadMessages, saveMessages } from './history.js';

const anthropic = new Anthropic({
  apiKey: X_API_KEY,
});

export async function fetchClaudeFromSDK(text) {
  if (!text) {
    console.log('No text provided');
    return;
  }

  let messages = loadMessages();
  messages.push({ role: 'user', content: text });

  const msg = await anthropic.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    messages,
  });

  if (msg.content) {
    messages.push({ role: 'assistant', content: msg.content });
    saveMessages(messages);
  }

  console.log(msg);
  return msg;
}

export async function fetchClaude(text) {
  if (!text) {
    console.log('No text provided');
    return;
  }

  let messages = loadMessages();
  messages.push({ role: 'user', content: text });

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
      'x-api-key': X_API_KEY,
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      messages,
    }),
  });

  const msg = await response.json();

  if (msg.content) {
    messages.push({ role: 'assistant', content: msg.content });
    saveMessages(messages);
  }

  console.log(msg);
  return msg;
}

export async function countTokensFromSDK(text) {
  if (!text) {
    console.log('No text provided');
    return;
  }

  let messages = loadMessages();
  messages.push({ role: 'user', content: text });

  const msg = await anthropic.messages.countTokens({
    model: MODEL,
    messages,
  });

  console.log(msg);
  return msg;
}

export async function countTokens(text) {
  if (!text) {
    console.log('No text provided');
    return;
  }

  let messages = loadMessages();
  messages.push({ role: 'user', content: text });

  const response = await fetch('https://api.anthropic.com/v1/messages/count_tokens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
      'x-api-key': X_API_KEY,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
    }),
  });

  const msg = await response.json();

  console.log(msg);
  return msg;
}
