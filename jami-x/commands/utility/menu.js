const { getRuntime } = require('../../lib/utils');

module.exports = {
  name: ['menu', 'help'],
  description: 'Show all commands',
  async execute({ sock, from, config }) {
    const runtime = getRuntime();
    const menu = `
╔══[ஜ۩ 𝗝𝗔𝗠𝗜-𝗫 ۩ஜ]══╗
║➽ *𝗡𝗔𝗠𝗘:* 🌟 *Jami-X Bot*
║➽ *𝗥𝗨𝗡𝗧𝗜𝗠𝗘:* ${runtime}
║➽ *𝗩𝗘𝗥𝗦𝗜𝗢𝗡:* v1.0.0
║➽ *𝗢𝗪𝗡𝗘𝗥:* ❦𝗟𝗲𝗴𝗲𝗻𝗱𝗝𝗮𝗺𝗶❦
║➽ *𝗧𝗚:* t.me/LegendJami
╚═══════ஜ۩۩ஜ═══════╝

╔═[ஜ۩ 𝗚𝗥𝗢𝗨𝗣 𝗠𝗘𝗡𝗨 ۩ஜ]═╗
║➽ .ban | .unban | .kick
║➽ .promote | .demote
║➽ .mute | .unmute
║➽ .kickall | .add
║➽ .lockgroup | .unlockgroup
║➽ .setname | .setdesc
║➽ .revoke | .resetlink
║➽ .welcome | .goodbye
║➽ .tagall | .hidetag
║➽ .tagadmins | .poll
╚━━━━━━━━━━━━━━━━━━━۩ஜ

╔═[ஜ۩ 𝗔𝗜 𝗠𝗘𝗡𝗨 ۩ஜ]═╗
║➽ .gpt | .gemini
║➽ .imagine | .flux
║➽ .dalle | .chatbot
╚━━━━━━━━━━━━━━━━━━━۩ஜ

╔═[ஜ۩ 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥 𝗠𝗘𝗡𝗨 ۩ஜ]═╗
║➽ .play | .song | .mp3
║➽ .video | .ytmp4 | .yts
║➽ .instagram | .tiktok
║➽ .facebook | .twitter
╚━━━━━━━━━━━━━━━━━━━۩ஜ

╔═[ஜ۩ 𝗧𝗢𝗢𝗟𝗦 𝗠𝗘𝗡𝗨 ۩ஜ]═╗
║➽ .calculator | .password
║➽ .translate | .qrcode
║➽ .shorturl | .screenshot
║➽ .hash | .base64 | .binary
║➽ .timestamp | .weather
╚━━━━━━━━━━━━━━━━━━━۩ஜ

╔═[ஜ۩ 𝗙𝗨𝗡 𝗠𝗘𝗡𝗨 ۩ஜ]═╗
║➽ .joke | .riddle | .roast
║➽ .8ball | .truth | .dare
║➽ .dice | .coin | .trivia
║➽ .tictactoe | .hangman
╚━━━━━━━━━━━━━━━━━━━۩ஜ

╔═[ஜ۩ 𝗦𝗧𝗜𝗖𝗞𝗘𝗥 𝗠𝗘𝗡𝗨 ۩ஜ]═╗
║➽ .sticker | .s | .blur
║➽ .meme | .emojimix | .take
╚━━━━━━━━━━━━━━━━━━━۩ஜ

╔═[ஜ۩ 𝗙𝗜𝗡𝗔𝗡𝗖𝗘 ۩ஜ]═╗
║➽ .currency | .crypto
║➽ .price | .market
╚━━━━━━━━━━━━━━━━━━━۩ஜ

╔═[ஜ۩ 𝗦𝗘𝗡𝗧𝗜𝗡𝗘𝗟 ۩ஜ]═╗
║➽ .antibadword | .antilink
║➽ .antidelete | .anticall
║➽ .pmpermit | .pmblock
║➽ .encrypt | .decrypt
╚━━━━━━━━━━━━━━━━━━━۩ஜ

╔═[ஜ۩ 𝗦𝗘𝗧𝗧𝗜𝗡𝗚𝗦 ۩ஜ]═╗
║➽ .mode | .autostatus
║➽ .setpp | .autoreact
║➽ .autotyping | .autorecord
║➽ .clearsession | .cleartmp
╚━━━━━━━━━━━━━━━━━━━۩ஜ

╔═[ஜ۩ 𝗢𝗧𝗛𝗘𝗥 ۩ஜ]═╗
║➽ .ping | .alive | .uptime
║➽ .owner | .quote | .fact
║➽ .news | .groupinfo | .jid
╚━━━━━━━━━━━━━━━━━━━۩ஜ

┏═══════════════════╗
┃  ❦ 𝗟𝗲𝗴𝗲𝗻𝗱𝗝𝗮𝗺𝗶 ❦
╠────────────────────╣
┃ 𝚃𝙶: t.me/LegendJami
┗۩═══════════════════╝`;

    await sock.sendMessage(from, { text: menu });
  }
};
