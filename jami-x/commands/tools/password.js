module.exports = {
  name: ['password'],
  description: 'Generate a strong password',
  async execute({ sock, from, args }) {
    const length = parseInt(args[0]) || 16;
    if (length < 4 || length > 64) return await sock.sendMessage(from, { text: '❌ Length must be between 4 and 64' });
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}';
    let password = '';
    for (let i = 0; i < length; i++) password += chars[Math.floor(Math.random() * chars.length)];
    await sock.sendMessage(from, { text: `🔐 *Generated Password (${length} chars):*\n\n\`${password}\`\n\n⚠️ _Save this somewhere safe!_` });
  }
};
