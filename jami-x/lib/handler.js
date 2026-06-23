const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const commands = new Map();

async function loadCommands() {
  const cmdDir = path.join(__dirname, '../commands');
  const folders = fs.readdirSync(cmdDir);
  let total = 0;

  for (const folder of folders) {
    const folderPath = path.join(cmdDir, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.js'));
    for (const file of files) {
      try {
        const cmd = require(path.join(folderPath, file));
        if (cmd.name) {
          const names = Array.isArray(cmd.name) ? cmd.name : [cmd.name];
          for (const n of names) commands.set(n.toLowerCase(), cmd);
          total++;
        }
      } catch (e) {
        console.log(chalk.red(`❌ Failed to load ${file}: ${e.message}`));
      }
    }
  }

  console.log(chalk.green(`✅ Loaded ${total} commands`));
  return commands;
}

async function handleMessage(sock, msg, commands, config) {
  try {
    const from = msg.key.remoteJid;
    const isGroup = from.endsWith('@g.us');
    const sender = isGroup ? msg.key.participant : msg.key.remoteJid;
    const isOwner = sender?.replace(/[^0-9]/g, '') === config.ownerNumber.replace(/[^0-9]/g, '');

    const body =
      msg.message?.conversation ||
      msg.message?.extendedTextMessage?.text ||
      msg.message?.imageMessage?.caption ||
      msg.message?.videoMessage?.caption || '';

    // Auto-read
    if (config.autoRead) await sock.readMessages([msg.key]);

    // Auto-typing indicator
    if (config.autoTyping && body.startsWith(config.prefix)) {
      await sock.sendPresenceUpdate('composing', from);
    }

    // Anti-call
    if (config.antiCall && msg.message?.callOfferMessage) {
      await sock.rejectCall(msg.message.callOfferMessage.callId, from);
      return;
    }

    if (!body.startsWith(config.prefix)) return;

    const args = body.slice(config.prefix.length).trim().split(/\s+/);
    const commandName = args.shift().toLowerCase();
    const text = args.join(' ');

    const cmd = commands.get(commandName);
    if (!cmd) return;

    // Mode check
    if (config.mode === 'private' && !isOwner) {
      return await sock.sendMessage(from, { text: '❌ Bot is in *Private Mode*. Only owner can use it.' });
    }

    // Owner-only commands
    if (cmd.ownerOnly && !isOwner) {
      return await sock.sendMessage(from, { text: '❌ This command is *owner only*!' });
    }

    // Group-only commands
    if (cmd.groupOnly && !isGroup) {
      return await sock.sendMessage(from, { text: '❌ This command can only be used in *groups*!' });
    }

    const ctx = { sock, msg, from, sender, args, text, isGroup, isOwner, config };

    await cmd.execute(ctx);

    // Auto-react on success
    if (config.autoReact) {
      const emojis = ['✅', '⚡', '🔥', '💫', '✨'];
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      await sock.sendMessage(from, {
        react: { text: emoji, key: msg.key }
      });
    }

  } catch (e) {
    console.error(chalk.red('Handler error:'), e.message);
  }
}

module.exports = { loadCommands, handleMessage };
