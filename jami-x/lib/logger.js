const chalk = require('chalk');

function banner() {
  const uptime = process.uptime();
  const h = Math.floor(uptime / 3600);
  const m = Math.floor((uptime % 3600) / 60);
  const s = Math.floor(uptime % 60);

  console.log(chalk.cyan(`
╔══[ஜ۩ 𝗝𝗔𝗠𝗜-𝗫 ۩ஜ]══╗
║➽ 𝗡𝗔𝗠𝗘    : Jami-X Bot
║➽ 𝗥𝗨𝗡𝗧𝗜𝗠𝗘 : ${h}h ${m}m ${s}s
║➽ 𝗩𝗘𝗥𝗦𝗜𝗢𝗡 : v1.0.0
║➽ 𝗢𝗪𝗡𝗘𝗥   : LegendJami
║➽ 𝗧𝗚     : t.me/LegendJami
╚═══════ஜ۩۩ஜ═══════╝
  `));
}

module.exports = { banner };
