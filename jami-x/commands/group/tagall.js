module.exports = {
  name: ['tagall'],
  description: 'Tag all group members',
  groupOnly: true,
  async execute({ sock, from, text }) {
    const groupMeta = await sock.groupMetadata(from);
    const members = groupMeta.participants.map(p => p.id);
    const message = text || '📢 Attention everyone!';
    const mentions = members.map(m => `@${m.split('@')[0]}`).join(' ');
    await sock.sendMessage(from, {
      text: `${message}\n\n${mentions}`,
      mentions: members
    });
  }
};
