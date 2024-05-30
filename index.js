const {
  Client,
  GatewayIntentBits,
  Partials,
  REST,
  Routes,
} = require("discord.js");
const fs = require("fs");

// Put your Discord bot token here in "Token Here"
const DISCORD_TOKEN = "Token Here";

// List of allowed user IDs
const ALLOWED_USER_IDS = ["123456789012345678", "234567890123456789"]; // Replace with actual user IDs

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

const commands = {};

// Load commands dynamically across all servers (note discord may be a bit slow when updating!)
fs.readdirSync("./commands").forEach((file) => {
  if (file.endsWith(".js")) {
    const command = require(`./commands/${file}`);
    commands[command.name] = command;
  }
});

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);

  // Deploy commands
  const commandData = Object.values(commands).map((command) => ({
    name: command.name,
    description: command.description,
    options: command.options || [],
  }));

  const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationCommands(client.user.id), {
      body: commandData,
    });
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error("Error deploying commands:", error);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = commands[interaction.commandName];
  if (!command) return;

  // Check if the user is allowed to execute commands
  if (!ALLOWED_USER_IDS.includes(interaction.user.id)) {
    await interaction.reply({
      content: "You are not authorized to use this command.",
      ephemeral: true,
    });
    return;
  }

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error executing that command!",
      ephemeral: true,
    });
  }
});

client.login(DISCORD_TOKEN);

console.log(
  "Hey just so you know, the bot will throw errors if the person you want to ban isn't in all the servers that the bot is in but it will not break, normal thing that it does."
);
