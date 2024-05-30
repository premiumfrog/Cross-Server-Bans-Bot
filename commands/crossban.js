module.exports = {
  name: "crossban",
  description: "Bans a user from all servers the bot is in.",
  options: [
    {
      name: "user",
      type: 3,
      description: "The User ID of the user to ban",
      required: true,
    },
  ],
  async execute(interaction, client) {
    await interaction.deferReply(); // Defer the initial reply

    const userId = interaction.options.getString("user");
    const guilds = client.guilds.cache;
    let count = 0;
    const totalGuilds = guilds.size;

    for (const [guildId, guild] of guilds) {
      try {
        const member = await guild.members.fetch(userId); // Check if the user is a member of the guild
        await guild.members.ban(member); // Ban the member
        count++;
        await interaction.editReply(`Banning (${count} - ${totalGuilds})`);
      } catch (error) {
        console.error(`Failed to ban in guild ${guildId}:`, error);
      }
    }

    await interaction.followUp(`Banned ${userId} successfully.`);
  },
};
