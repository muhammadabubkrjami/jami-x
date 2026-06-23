module.exports = {
  name: ['owner'],
  description: 'Get owner info',
  async execute({ sock, from, config }) {
    await sock.sendMessage(from, {
      text: `╔══[ஜ۩ 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 ۩ஜ]══╗\n║ 👤 *${config.owner}*\n║ 📱 wa.me/${config.ownerNumber}\n║ 📢 ${config.ownerTelegram}\n╚══════ஜ۩۩ஜ══════╝`
    });
  }
};
