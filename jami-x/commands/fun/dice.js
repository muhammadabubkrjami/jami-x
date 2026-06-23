module.exports = {
  name: ['dice'],
  description: 'Roll a dice',
  async execute({ sock, from }) {
    const result = Math.floor(Math.random() * 6) + 1;
    const faces = ['', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣'];
    await sock.sendMessage(from, { text: `🎲 *Dice Roll!*\n\nResult: ${faces[result]} *(${result})*` });
  }
};
