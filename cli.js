import readline from 'readline';
import { fetchClaudeFromSDK } from './anthropic.js';
import { loadMessages, saveMessages, clearChatHistory } from './history.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Claude AI 채팅을 시작합니다. (종료하려면 'exit' 입력)");
process.stdout.write('> ');

rl.on('line', async (userInput) => {
  if (!userInput.trim()) {
    process.stdout.write('> ');
    return;
  }

  if (userInput.toLowerCase() === 'clear') {
    clearChatHistory();
    console.log('채팅 기록을 삭제했습니다.');
    process.stdout.write('> ');
    return;
  }

  if (userInput.toLowerCase() === 'exit') {
    clearChatHistory();
    console.log('채팅을 종료합니다.');
    rl.close();
    return;
  }

  let messages = loadMessages();
  messages.push({ role: 'user', content: userInput });

  const message = await fetchClaudeFromSDK({ messages });
  if (message?.content) {
    messages.push({ role: 'assistant', content: message.content });
    saveMessages(messages);
  }

  if (message?.content?.[0]?.text) {
    console.log(message.content[0].text);
  } else {
    console.log(message);
  }

  process.stdout.write('> ');
});

rl.on('SIGINT', () => {
  clearChatHistory();
  console.log('\n채팅을 종료합니다.');
  rl.close();
});
