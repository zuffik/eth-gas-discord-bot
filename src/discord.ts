import {Client} from 'discord.js';

export const discordClient = async (): Promise<Client> => {
    const client = new Client();
    await client.login(process.env.DISCORD_BOT_TOKEN);
    return client;
};
