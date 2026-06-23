module.exports = {
  name: ['ban', 'kick'],
  description: 'Remove a user from group',
  groupOnly: true,
  async execute({ sock, from, msg, args, sender, isOwner }) {
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
    const target = mentioned?.[0] || (args[0] ? args[0] + '@s.whatsapp.net' : null);
    if (!target) return await sock.sendMessage(from, { text: '❌ Mention someone to ban/kick!' });

    const groupMeta = await sock.groupMetadata(from);
    const me = sock.user.id.replace(/:[0-9]+/, '') + '@s.whatsapp.net';
    const isAdmin = groupMeta.participants.find(p => p.id === me)?.admin;
    if (!isAdmin) return await sock.sendMessage(from, { text: '❌ I need admin rights!' });

    await sock.groupParticipantsUpdate(from, [target], 'remove');
    await sock.sendMessage(from, { text: `✅ *@${target.split('@')[0]}* has been removed!`, mentions: [target] });
  }
};
