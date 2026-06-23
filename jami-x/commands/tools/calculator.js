module.exports = {
  name: ['calculator', 'calc'],
  description: 'Calculate a math expression',
  async execute({ sock, from, text }) {
    if (!text) return await sock.sendMessage(from, { text: '❌ Usage: .calc 5 * 10 + 3' });
    try {
      const safe = text.replace(/[^0-9+\-*/().%\s]/g, '');
      const result = Function(`"use strict"; return (${safe})`)();
      await sock.sendMessage(from, { text: `🧮 *Calculator*\n\n📥 Input: \`${text}\`\n📤 Result: *${result}*` });
    } catch {
      await sock.sendMessage(from, { text: '❌ Invalid expression!' });
    }
  }
};
