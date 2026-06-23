module.exports = {
  name: ['promote'],
  description: 'Promote a user to admin',
  groupOnly: true,
  async execute({ sock, from, msg, args }) {
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
    const target = mentioned?.[0] || (args[0] ? args[0] + '@s.whatsapp.net' : null);
    if (!target) return await sock.sendMessage(from, { text: '❌ Mention someone to promote!' });
    await sock.groupParticipantsUpdate(from, [target], 'promote');
    await sock.sendMessage(from, { text: `✅ *@${target.split('@')[0]}* promoted to Admin! 🎖️`, mentions: [target] });
  }
};
