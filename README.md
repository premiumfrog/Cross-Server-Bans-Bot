# Discord Crossban Bot

A Discord bot that bans a user from all servers the bot is in.

THIS IS NOT A BOT THAT LINKS BANS FROM OTHER NON RELATED SERVERS. I dispise those bots as they could be an abuse haven. Please do not use this bot to make a banning network/bot that links bans.

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.6.0 or higher)
- [Discord.js](https://discord.js.org/) (v14.0.0 or higher)
- [Discord Developer Portal](https://discord.com/developers/applications) access

### Steps

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/discord-crossban-bot.git
   cd discord-crossban-bot
    ```
2. Install the dependencies:

 ```sh
   git clone https://github.com/yourusername/discord-crossban-bot.git
   cd discord-crossban-bot
 ```
3. Register your bot on the Discord Developer Portal:

Go to the Developer Portal.
Create a new application.
Navigate to the "Bot" tab and add a bot.
Copy the bot token and paste it into the ADD YOUR TOKEN HERE part: " const DISCORD_TOKEN = "Token Here"; "
 
 4. Add your bot to your Discord server:

Go to the "OAuth2" tab.
Under "OAuth2 URL Generator", select the bot scope.
Under "OAuth2 URL Generator", select the required bot permissions (Administrator is the easiest to enable, has every permission).
Copy the generated URL and paste it into your browser to invite the bot to your server.

 5. Add your userid to the list of allowed user IDs.
Enable developer mode on discord
Right click a message or yourself on the Member List
Click "Copy User ID"
Paste into one of the ALLOWED_USER_IDS (You can add more if needed!)
 
 6. Start the bot:

```sh
npm start
```

Usage
Use the /crossban command followed by the user ID to ban a user from all servers the bot is in.
Use the /uncrossban command followed by the user ID to unban a user from all servers the bot is in.
Use the /status to simpily set the status.

# Contributing

Feel free to submit issues and pull requests for any improvements or fixes.

# License

This project is licensed under the MIT License. See more info in the LICENSE.md file.

# If you put anything besides a userid in the crossban/crossunban, it will say its banned but they wont be. Use userids, I will make a fix for this soon.

#Planned features 

Picking this back up, going to add a few anti ratelimit settings, better experience, and very needed bug fixes. Please make issues in the issues tab and let me know asap
