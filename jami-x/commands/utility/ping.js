const { getRuntime } = require('../../lib/utils');

module.exports = {
  name: ['ping', 'alive', 'uptime', 'runtime'],
  description: 'Check bot status',
  async execute({ sock, from }) {
    const start = Date.now();
    await sock.sendMessage(from, { text: '🏓 Pinging...' });
    const ping = Date.now() - start;
    await sock.sendMessage(from, {
      text: `╔══[ஜ۩ 𝗝𝗔𝗠𝗜-𝗫 ۩ஜ]══╗\n║ 🟢 *Bot is Alive!*\n║ ⚡ Ping: ${ping}ms\n║ ⏱️ Runtime: ${getRuntime()}\n║ 💾 RAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\n╚══════ஜ۩۩ஜ══════╝`
    });
  }
};
