module.exports = {
  name: ['demote'],
  description: 'Demote an admin to member',
  groupOnly: true,
  async execute({ sock, from, msg, args }) {
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
    const target = mentioned?.[0] || (args[0] ? args[0] + '@s.whatsapp.net' : null);
    if (!target) return await sock.sendMessage(from, { text: '❌ Mention someone to demote!' });
    await sock.groupParticipantsUpdate(from, [target], 'demote');
    await sock.sendMessage(from, { text: `✅ *@${target.split('@')[0]}* demoted to Member!`, mentions: [target] });
  }
};
