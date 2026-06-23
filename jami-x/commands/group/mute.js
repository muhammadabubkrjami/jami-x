module.exports = {
  name: ['mute'],
  description: 'Mute the group',
  groupOnly: true,
  async execute({ sock, from }) {
    await sock.groupSettingUpdate(from, 'announcement');
    await sock.sendMessage(from, { text: '🔇 Group has been *muted*! Only admins can send messages.' });
  }
};
