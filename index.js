const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const express = require('express');

// 1. SERVIDOR HTTP (Impede o Render de dormir)
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot ProFUT rodando 24/7!');
});

app.listen(PORT, () => {
    console.log(`Servidor HTTP ouvindo na porta ${PORT}`);
});

// 2. DISCORD BOT
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log(`Bot ProFUT online como: ${client.user.tag}`);
});

// COMANDO DE SANÇÃO (BAN)
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'sancao') {
        const usuario = interaction.options.getString('usuario');
        const motivo = interaction.options.getString('motivo');
        const bail = interaction.options.getString('bail') || '800';

        const embedSancao = new EmbedBuilder()
            .setTitle('PRO FUT SANCTION')
            .setColor(0x2B2D3f)
            .addFields(
                { name: '🛡️ Nome do usuário banido:', value: usuario },
                { name: '🛡️ Motivo do banimento:', value: motivo },
                { name: '🛡️ Bail/Blacklist:', value: bail },
                { name: '🛡️ Volta:', value: 'n/a' }
            )
            .setDescription(
                'Todos os banimentos concedem ao usuário o direito de appeal em nosso STJD, onde, ao provar que não cometeu nenhuma infração na liga, poderá solicitar a revisão da punição.\n\n**PRO FUT STJD**\nhttps://discord.gg/seu-link-aqui'
            );

        await interaction.reply({
            content: `Ban registrado por: ${interaction.user}`,
            embeds: [embedSancao]
        });
    }
});

client.login(process.env.DISCORD_TOKEN);

