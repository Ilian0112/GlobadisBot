// MODULE
const Discord = require(`discord.js`);
const firebase = require("firebase");
//

// NEW CLIENT ( les deux pour pas ce prendre la tête )
const client = new Discord.Client();
const bot = new Discord.Client();
//

// BOT INFO
const version = `V.0.0.1`
const PREFIX = `!`
const botname = `GlobadisBot`
//

// Quand le BOT est start
bot.on(`ready`, function () {
    console.log(`${botname} connectée !`);
})
//

// Date Base

//

// Le code 
bot.on("message", async function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split (` `);

    var args2 = message.content.split(` `).slice(1);

    var suffix = args2.join(` `);

    var reason = args2.slice(1).join(` `);
    
    var reasontimed = args2.slice(2).join(' ')

    var user = message.mentions.users.first();
    
    var guild = message.guild;
    
    var member = message.member;
    
    var roleMute = member.guild.roles.find(`name`, `Mute`)

    var foother = `Commande effectué par @` + message.author.username + `#` + message.author.discriminator + ` ! | GlobadisBot - ` + version
    
    var modlog = member.guild.channels.find(`name`, `log`)
    
    var user = message.mentions.users.first();

    switch (args[0].toLowerCase()) {
        case `mute`:
            message.delete()

        break;
       
        case `tempmute`:
            message.delete()

        break;

        case `unmute`:
            message.delete()

        break;
        
        case `kick`:
            message.delete()

        break;

        case `ban`:
            message.delete()

        break;
       
        case `unban`:
            message.delete()

        break;       

        case `level`:
            message.delete()

        break;       

        case `help`:
        if(message.author.bot) return message.channel.send(`Erreur, les bot ne peuve utiliser mes commandes.`)
            message.delete()

                var help_embed = new Discord.RichEmbed()
                    .setTitle(`Menu d'aide`)
                        .addField(PREFIX + `mute`, `Cette commande vous permet de réduire au silence une personne.`)
                        .addField(PREFIX + `tempmute`, `Cette commande vous permet de réduire au silence une personne durant la durée de votre choix.`)
                        .addField(PREFIX + `unmute`, `Cette commande vous permet de rendre la possibilité de parler à une personne réduite au silence.`)
                        .addField(PREFIX + `kick`, `Cette commande vous permet d'expulser une personne du serveur.`)
                        .addField(PREFIX + `ban`, `Cette commande vous permet de bannir une personne du serveur.`)
                        .addField(PREFIX + `unban`, `Cette commande vous permet de révoquer le bannissement d'une personne du serveur.`)
                        .addBlankField()
                        .addField(PREFIX + `level`, `Cette commande vous permet de voir votre niveau ou celui d'un autre membre.`)
                        .addField(PREFIX + `help`, `Cette commande vous permet d'affichier l'aide.`)
                    .setColor(`#53A338`)
                    .setFooter(foother)
            message.channel.send(help_embed)
        break;           }
});

bot.login(`NTE3NzM4Njg4OTQwMjEyMjY2.DuGnBw.SnLwWppomPk6I6BqRIAfl34vrWg`);