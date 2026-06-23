module.exports = {
  name: ['base64'],
  description: 'Encode or decode base64',
  async execute({ sock, from, args, text }) {
    const mode = args[0]?.toLowerCase();
    const input = args.slice(1).join(' ');
    if (!mode || !input) return await sock.sendMessage(from, { text: '❌ Usage:\n.base64 encode <text>\n.base64 decode <text>' });

    try {
      if (mode === 'encode') {
        const encoded = Buffer.from(input).toString('base64');
        await sock.sendMessage(from, { text: `🔒 *Base64 Encoded:*\n\n\`${encoded}\`` });
      } else if (mode === 'decode') {
        const decoded = Buffer.from(input, 'base64').toString('utf8');
        await sock.sendMessage(from, { text: `🔓 *Base64 Decoded:*\n\n${decoded}` });
      } else {
        await sock.sendMessage(from, { text: '❌ Mode must be *encode* or *decode*' });
      }
    } catch {
      await sock.sendMessage(from, { text: '❌ Invalid input!' });
    }
  }
};
