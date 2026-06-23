module.exports = {
  name: ['unmute'],
  description: 'Unmute the group',
  groupOnly: true,
  async execute({ sock, from }) {
    await sock.groupSettingUpdate(from, 'not_announcement');
    await sock.sendMessage(from, { text: '🔊 Group has been *unmuted*! Everyone can send messages now.' });
  }
};
