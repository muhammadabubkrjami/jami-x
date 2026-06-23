const { pickRandom } = require('../../lib/utils');

const jokes = [
  "Why don't scientists trust atoms? Because they make up everything! 😂",
  "I told my wife she was drawing her eyebrows too high. She looked surprised! 😆",
  "Why can't you give Elsa a balloon? Because she'll let it go! ❄️",
  "What do you call fake spaghetti? An impasta! 🍝",
  "Why did the scarecrow win an award? He was outstanding in his field! 🌾"
];

const eightBallAnswers = [
  '✅ Yes, definitely!', '✅ It is certain!', '✅ Without a doubt!',
  '🤔 Maybe...', '🤔 Ask again later', '🤔 Cannot predict now',
  '❌ Don\'t count on it', '❌ My reply is no', '❌ Very doubtful'
];

const riddles = [
  { q: "I speak without a mouth and hear without ears. What am I?", a: "An echo" },
  { q: "The more you take, the more you leave behind. What am I?", a: "Footsteps" },
  { q: "What has keys but no locks, space but no room?", a: "A keyboard" },
];

module.exports = {
  name: ['joke'],
  description: 'Get a random joke',
  async execute({ sock, from }) {
    await sock.sendMessage(from, { text: `😂 *Joke Time!*\n\n${pickRandom(jokes)}` });
  }
};
