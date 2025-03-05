import Anthropic from '@anthropic-ai/sdk';
import { MODEL, MAX_TOKENS, X_API_KEY } from './config.js';

const anthropic = new Anthropic({
  apiKey: X_API_KEY,
});

export async function fetchClaudeFromSDK({ text, messages, options }) {
  if (!text && !messages) {
    console.log('No messages provided');
    return;
  }

  const msg = await anthropic.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    messages: messages || [{ role: 'user', content: text }],
    ...options,
  });

  return msg;
}

export async function fetchClaude({ text, messages, options }) {
  if (!text && !messages) {
    console.log('No messages provided');
    return;
  }

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
      messages: messages || [{ role: 'user', content: text }],
      ...options,
    }),
  });

  const msg = await response.json();

  return msg;
}

export async function countTokensFromSDK({ text, messages, options }) {
  if (!text && !messages) {
    console.log('No messages provided');
    return;
  }

  const msg = await anthropic.messages.countTokens({
    model: MODEL,
    messages: messages || [{ role: 'user', content: text }],
    ...options,
  });

  return msg;
}

export async function countTokens({ text, messages, options }) {
  if (!text && !messages) {
    console.log('No messages provided');
    return;
  }

  const response = await fetch('https://api.anthropic.com/v1/messages/count_tokens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
      'x-api-key': X_API_KEY,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: messages || [{ role: 'user', content: text }],
      ...options,
    }),
  });

  const msg = await response.json();

  return msg;
}
