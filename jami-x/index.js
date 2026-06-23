const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/status", (req,res)=>{
  res.json({
    online:true,
    uptime: process.uptime()
  });
});


app.listen(3000, ()=>{
 console.log("API running on port 3000");
});
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const config = require('./config/config');
const { loadCommands } = require('./lib/handler');
const logger = require('./lib/logger');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

async function startBot() {
  logger.banner();

  const { state, saveCreds } = await useMultiFileAuthState('./auth_info');
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' })),
    },
    browser: ['Jami-X', 'Chrome', '120.0.0'],
    markOnlineOnConnect: true,
  });

  // Pairing Code Flow
  if (!sock.authState.creds.registered) {
    console.log(chalk.cyan('\n╔══════════════════════════════════╗'));
    console.log(chalk.cyan('║     🔐  JAMI-X PAIRING CODE      ║'));
    console.log(chalk.cyan('╚══════════════════════════════════╝\n'));
    const phoneNumber = await question(chalk.yellow('📱 Enter your WhatsApp number (with country code, e.g. 923001234567): '));
    const cleaned = phoneNumber.replace(/[^0-9]/g, '');
    const code = await sock.requestPairingCode(cleaned);
    console.log(chalk.green(`\n✅ Your Pairing Code: `) + chalk.bgGreen.black.bold(` ${code} `));
    console.log(chalk.gray('\n👉 Go to WhatsApp > Linked Devices > Link with Phone Number > Enter this code\n'));
  }

  const commands = await loadCommands();

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
    if (connection === 'open') {
      console.log(chalk.green('\n✅ Jami-X Bot Connected Successfully!\n'));
      logger.banner();
    } else if (connection === 'close') {
      const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
      if (reason !== DisconnectReason.loggedOut) {
        console.log(chalk.yellow('🔄 Reconnecting...'));
        startBot();
      } else {
        console.log(chalk.red('❌ Logged out. Delete auth_info folder and restart.'));
        process.exit(0);
      }
    }
  });

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;
    for (const msg of messages) {
      if (!msg.message) continue;
      await require('./lib/handler').handleMessage(sock, msg, commands, config);
    }
  });

  sock.ev.on('group-participants.update', async (update) => {
    await require('./lib/events').handleGroupUpdate(sock, update, config);
  });
}

startBot().catch(console.error);
