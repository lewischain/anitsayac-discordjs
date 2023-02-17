import got from "got";
import { parse } from "node-html-parser"; 
import { Client, IntentsBitField, REST, Routes } from "discord.js";
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
    ]
})

const token = "TOKEN";
const url = "http://anitsayac.com/";

const getDatabase = async () => {
    const Web = parse(await got(url).text());
    const Selector = Web.querySelector("p").innerHTML

    var sayi = `${Selector.split(".jpg")[0].slice(13)}${Selector.split(".jpg")[1].slice(25)}`;

    return {
        response: sayi
    }
}

const rest = new REST({ version: "10" }).setToken(token);

const commands = [
    {
      name: 'ölensayısı',
      description: 'Şiddet yüzünden ölen kadın sayısını gösterir.',
    },
  ];

client.once("ready", async () => {
    try {
        console.log('Started refreshing application (/) commands.');
    
        await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
    
        console.log('Successfully reloaded application (/) commands.');
      } catch (error) {
        console.error(error);
      }
});

client.on("interactionCreate", async (interaction) => {
    if(interaction.isChatInputCommand()) {
        if(interaction.commandName === "ölensayısı") {
            const ölenler = (await getDatabase()).response;

            interaction.reply({ content: `:cry: **|** Bu yıl şiddetten ölen **${ölenler}** bulunuyor.` })
        }
    }
});

client.login(token);