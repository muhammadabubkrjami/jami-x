module.exports = {
  name: ['mode'],
  description: 'Set bot mode (public/private)',
  ownerOnly: true,
  async execute({ sock, from, args, config }) {
    const m = args[0]?.toLowerCase();
    if (!m || !['public', 'private'].includes(m)) {
      return await sock.sendMessage(from, { text: '❌ Usage: .mode public | .mode private' });
    }
    config.mode = m;
    await sock.sendMessage(from, { text: `✅ Bot mode set to *${m.toUpperCase()}*` });
  }
};
