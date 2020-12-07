import {config} from 'dotenv';
import {discordClient} from "./discord";
import {EthGasResponse, httpClient} from "./http";
import {TextChannel} from "discord.js";

config();

async function main() {
    const bot = await discordClient();
    let poll: NodeJS.Timeout;
    const threshold = parseInt(process.env.ETHGAS_THRESHOLD);
    const channelId = process.env.DISCORD_BOT_CHANNEL;
    let last: number[];
    poll = setInterval(async () => {
        const response = await httpClient.get<EthGasResponse>('/ethgasAPI.json');
        let {
            average,
            fast,
            fastest,
            safeLow,
        } = response.data;
        average /= 10;
        fast /= 10;
        fastest /= 10;
        safeLow /= 10;
        const gweis = [average, fast, fastest, safeLow];
        if (!last || !last.some(v => v < threshold) && gweis.some(v => v < threshold)) {
            last = gweis.slice();
            const channel: TextChannel = await bot.channels.cache.find(ch => ch.isText() && (ch as TextChannel).name?.toLowerCase() == channelId) as TextChannel | undefined;
            if (!channel) {
                throw new Error(`Channel '${channelId}' does not exist.`);
            }
            await channel.send(
                `**Average:** ${average}\n` +
                `**Fast:** ${fast}\n` +
                `**Fastest:** ${fastest}\n` +
                `**Safe low:** ${safeLow}\n`
            );
        } else {
            last = gweis.slice();
        }
    }, parseInt(process.env.HTTP_POLL_TIMEOUT));
    bot.on('error', (e) => {
        console.error(e);
        /*if (poll) {
            clearInterval(poll);
        }
        throw e;*/
    });
}

main().catch(e => {
    console.error(e);
    process.exit(1);
});
