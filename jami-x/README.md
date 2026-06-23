# ╔══[ஜ۩ 𝗝𝗔𝗠𝗜-𝗫 ۩ஜ]══╗
> WhatsApp Bot by **LegendJami** | Telegram: [t.me/LegendJami](https://t.me/LegendJami)

---

## ⚡ Features
- ✅ Pairing Code login (no QR scan needed!)
- ✅ Group management (ban, promote, mute, tagall...)
- ✅ Fun commands (joke, 8ball, dice, coin...)
- ✅ Tools (calculator, password, base64...)
- ✅ Welcome/Goodbye messages
- ✅ Auto-react, auto-typing
- ✅ Public/Private mode
- ✅ Owner-only commands
- ✅ Modular command system (easy to add more)

---

## 🚀 Setup Guide

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/jami-x
cd jami-x
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set your number in config
Edit `config/config.js`:
```js
ownerNumber: '923001234567', // Your number with country code, no + or spaces
```

### 4. Run the bot
```bash
node index.js
```

### 5. Pair with WhatsApp
- Enter your number when prompted
- You'll get an **8-digit Pairing Code**
- Open WhatsApp → **Linked Devices** → **Link a Device** → **Link with phone number**
- Enter the code ✅

---

## ☁️ Deploy on Render.com (Free)

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
5. Click **Deploy** 🚀

> ⚠️ On Render free tier, the bot sleeps after inactivity. Use [UptimeRobot](https://uptimerobot.com) to ping it every 5 minutes.

---

## 📁 Project Structure
```
jami-x/
├── index.js              # Main entry point
├── config/
│   └── config.js         # Bot settings
├── lib/
│   ├── handler.js        # Message & command handler
│   ├── events.js         # Welcome/goodbye events
│   ├── logger.js         # Console banner
│   └── utils.js          # Helper functions
└── commands/
    ├── group/            # Group admin commands
    ├── fun/              # Fun commands
    ├── tools/            # Utility tools
    ├── extra/            # Extra commands
    └── utility/          # Bot utility commands
```

---

## ➕ Adding New Commands
Create a new `.js` file in any `commands/` subfolder:
```js
module.exports = {
  name: ['hello'],           // command trigger(s)
  description: 'Say hello',
  groupOnly: false,          // true = group only
  ownerOnly: false,          // true = owner only
  async execute({ sock, from, text }) {
    await sock.sendMessage(from, { text: '👋 Hello World!' });
  }
};
```
Restart the bot — it auto-loads all commands!

---

## 👤 Owner
- **Telegram:** [t.me/LegendJami](https://t.me/LegendJami)
