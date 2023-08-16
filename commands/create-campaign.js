const {
  SlashCommandBuilder,
  ChannelType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("create-campaign")
    .setDescription("Create a New Campaign Space")
    .addStringOption((option) =>
      option
        .setName("campaign-name")
        .setDescription("The name of your new campaign")
        .setRequired(true)
    ),
  async execute(interaction) {
    const campaignName = interaction.options.getString("campaign-name");
    const campaignRole = await createNewRole(campaignName, interaction);
    createChannels(campaignName, interaction, campaignRole);
    await interaction.reply("Created Campaign Space!");
  },
};

async function createNewRole(campaignName, interaction) {
  return await interaction.guild.roles.create({
    name: campaignName + ` Player`,
    reason: `To grant access to spaces for campaign ` + campaignName,
  });
}

function createChannels(campaignName, message, campaignRole) {
  message.guild.channels
    .create({
      name: campaignName,
      type: ChannelType.GuildCategory,
      permissionOverwrites: [
        {
          id: message.guild.roles.everyone,
          deny: [PermissionFlagsBits.ViewChannel],
        },
        {
          id: campaignRole,
          allow: [PermissionFlagsBits.ViewChannel],
        },
      ],
    })
    .then((CategoryChannel) => {
      message.guild.channels.create({
        name: `landing-page`,
        type: ChannelType.GuildText,
        parent: CategoryChannel,
      });
      message.guild.channels.create({
        name: `scheduling`,
        type: ChannelType.GuildText,
        parent: CategoryChannel,
      });
      message.guild.channels.create({
        name: `party-chatter`,
        type: ChannelType.GuildText,
        parent: CategoryChannel,
      });
      message.guild.channels.create({
        name: `handouts`,
        type: ChannelType.GuildText,
        parent: CategoryChannel,
      });
      message.guild.channels.create({
        name: `scheduling`,
        type: ChannelType.GuildText,
        parent: CategoryChannel,
      });
      message.guild.channels.create({
        name: `in-character-chat`,
        type: ChannelType.GuildText,
        parent: CategoryChannel,
      });
      message.guild.channels.create({
        name: `dm-notes`,
        type: ChannelType.GuildText,
        parent: CategoryChannel,
      });
      message.guild.channels.create({
        name: campaignName + " Session",
        type: ChannelType.GuildVoice,
        parent: CategoryChannel,
      });
    })
    .catch();
}
