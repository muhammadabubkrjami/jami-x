const { pickRandom } = require('../../lib/utils');

const answers = [
  '✅ Yes, definitely!', '✅ It is certain!', '✅ Without a doubt!', '✅ Absolutely!',
  '🤔 Maybe...', '🤔 Ask again later', '🤔 Cannot predict now', '🤔 Signs point to yes',
  '❌ Don\'t count on it', '❌ My reply is no', '❌ Very doubtful', '❌ Outlook not so good'
];

module.exports = {
  name: ['8ball'],
  description: 'Ask the magic 8-ball',
  async execute({ sock, from, text }) {
    if (!text) return await sock.sendMessage(from, { text: '❓ Ask me a question!\nExample: .8ball Will I be rich?' });
    const answer = pickRandom(answers);
    await sock.sendMessage(from, { text: `🎱 *Magic 8-Ball*\n\n❓ ${text}\n\n${answer}` });
  }
};
