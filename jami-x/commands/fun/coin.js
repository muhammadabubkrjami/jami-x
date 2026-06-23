module.exports = {
  name: ['coin'],
  description: 'Flip a coin',
  async execute({ sock, from }) {
    const result = Math.random() < 0.5 ? '🪙 Heads!' : '🪙 Tails!';
    await sock.sendMessage(from, { text: `*Coin Flip!*\n\n${result}` });
  }
};
