module.exports = {
  name: "status",
  description: "Changes the bot's status.",
  options: [
    {
      name: "status",
      type: 3,
      description: "The new status for the bot",
      required: true,
    },
  ],
  async execute(interaction, client) {
    const newStatus = interaction.options.getString("status");

    try {
      client.user.setActivity(newStatus);
      await interaction.reply(`Status changed to: ${newStatus}`);
    } catch (error) {
      console.error(`Failed to change status:`, error);
      await interaction.reply({
        content: "Failed to change status.",
        ephemeral: true,
      });
    }
  },
};
