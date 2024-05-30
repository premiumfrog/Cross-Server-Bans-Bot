module.exports = {
  name: "uncrossban",
  description: "Unbans a user from all servers the bot is in.",
  options: [
    {
      name: "user",
      type: 3,
      description: "The User ID of the user to unban",
      required: true,
    },
  ],
  async execute(interaction, client) {
    await interaction.deferReply(); // defer the initial reply

    const userId = interaction.options.getString("user");
    const guilds = client.guilds.cache;
    let count = 0;
    const totalGuilds = guilds.size;

    let unbanningMessage = await interaction.editReply(
      `Starting to unban user ${userId} from all servers...`
    );

    for (const [guildId, guild] of guilds) {
      try {
        await guild.members.unban(userId);
        count++;
        unbanningMessage = await interaction.editReply(
          `Unbanning (${count} - ${totalGuilds})`
        );
      } catch (error) {
        console.error(`Failed to unban in guild ${guildId}:`, error);
      }
    }

    await interaction.followUp(
      `Unbanned ${userId} successfully from ${count} out of ${totalGuilds} servers.`
    );
  },
};
