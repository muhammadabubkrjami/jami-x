async function handleGroupUpdate(sock, update, config) {
  const { id, participants, action } = update;

  for (const participant of participants) {
    if (action === 'add' && config.welcomeMsg) {
      await sock.sendMessage(id, {
        text: `╔══[ஜ۩ 𝗝𝗔𝗠𝗜-𝗫 ۩ஜ]══╗\n║ 👋 Welcome @${participant.split('@')[0]}!\n║ Glad to have you here.\n║ Type *.menu* for commands.\n╚══════ஜ۩۩ஜ══════╝`,
        mentions: [participant],
      });
    } else if (action === 'remove' && config.goodbyeMsg) {
      await sock.sendMessage(id, {
        text: `╔══[ஜ۩ 𝗝𝗔𝗠𝗜-𝗫 ۩ஜ]══╗\n║ 👋 Goodbye @${participant.split('@')[0]}!\n║ Hope to see you again.\n╚══════ஜ۩۩ஜ══════╝`,
        mentions: [participant],
      });
    }
  }
}

module.exports = { handleGroupUpdate };
