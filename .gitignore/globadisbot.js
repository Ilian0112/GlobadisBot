// MODULE
const Discord = require(`discord.js`);
const ms = require(`ms`);
//

// NEW CLIENT ( les deux pour pas ce prendre la tête )
const client = new Discord.Client();
const bot = new Discord.Client();
//

// BOT INFO
const version = `V.0.0.4`
const PREFIX = `$`
const botname = `GlobadisBot`
//

// Quand le BOT est start
bot.on(`ready`, function () {
    console.log(`${botname} connectée !`);
    bot.user.setActivity(`GlobadisMCPE`)
})
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
    
    var modlog = member.guild.channels.find(`name`, `logs`)
    
// Level Système

//


    var user = message.mentions.users.first();

        var noperm_embed = new Discord.RichEmbed()
            .setTitle(`⚠Erreur⚠`)
            .setDescription(`Vous n'êtes pas autoriser à effectuer cette commande !`)
            .setFooter(foother)
            .setColor(`#FF0000`)
            .setTimestamp()

        var nologschannel_embed = new Discord.RichEmbed()
            .setTitle(`⚠Erreur⚠`)
            .setDescription(`Le channel __**#logs**__ est introuvable merci de le créé.`)
            .setFooter(foother)
            .setColor(`#FF0000`)
            .setTimestamp()
        
        var noreason_embed = new Discord.RichEmbed()
            .setTitle(`⚠Erreur⚠`)
            .setDescription(`Vous avez oublié la raison de la sanction.`)
            .setFooter(foother)
            .setColor(`#FF0000`)
            .setTimestamp()

    switch (args[0].toLowerCase()) {
        case `mute`:
            message.delete()

            var norolemute_embed = new Discord.RichEmbed()
                .setTitle(`⚠Erreur⚠`)
                .setDescription(`Le rôle __**Mute**__ est introuvable !`)
                .setFooter(foother)
                .setColor(`#FF0000`)
                .setTimestamp()

            var nomention_embed = new Discord.RichEmbed()
                .setTitle(`⚠Erreur⚠`)
                .setDescription(`Vous devez mentionner une personne afin de la réduire au silence !`)
                .setFooter(foother)
                .setColor(`#FF0000`)
                .setTimestamp()

            if(!message.member.hasPermission(`MUTE_MEMBERS`)) return message.channel.send(noperm_embed);
            if(!modlog) return message.channel.send(nologschannel_embed);  
            if(!roleMute) return message.channel.send(norolemute_embed)
            var member = message.mentions.members.first();
            if (message.mentions.users.size < 1) return message.channel.send(nomention_embed)
            if(!reason) return message.channel.send(noreason_embed)
        
            message.channel.send(`${member.toString()} a bien été réduit au silence !`)
            member.addRole(roleMute)
        
                var mute_embed = new Discord.RichEmbed()
                    .setAuthor(`Sanction : Mute`)
                        .addField(`Modérateur :`, `${message.author.username}#${message.author.discriminator}`)
                        .addField(`Utilisateur :`, `${user.toString()}`, true)
                        .addField(`ID Utilisateur :`, `${user.id}`)
                        .addField(`Raison :`, `${reason}`)
                    .setFooter(foother)
                    .setTimestamp()
                    .setColor(`#FF0000`)
            
            modlog.send(mute_embed)
            
        break;
       
        case `tempmute`:
            message.delete()
            let tomute = message.guild.member(message.mentions.users.first())
            let mutetime = message.content.split(" ").slice(2).join(" ");

                var norolemute_embed = new Discord.RichEmbed()
                    .setTitle(`⚠Erreur⚠`)
                    .setDescription(`Le rôle __**Mute**__ est introuvable !`)
                    .setFooter(foother)
                    .setColor(`#FF0000`)
                    .setTimestamp()

                var nomention_embed = new Discord.RichEmbed()
                    .setTitle(`⚠Erreur⚠`)
                    .setDescription(`Vous devez mentionner une personne afin de la réduire au silence !`)
                    .setFooter(foother)
                    .setColor(`#FF0000`)
                    .setTimestamp()
                    

                var notime_embed = new Discord.RichEmbed()
                    .setTitle(`⚠Erreur⚠`)
                    .setDescription(`Vous devez indiquer le temps voulu afin de réduire la personne au silence !`)
                    .setFooter(foother)
                    .setColor(`#FF0000`)
                    .setTimestamp()

                var nohastimedmute_embed = new Discord.RichEmbed()
                    .setAuthor(`Sanction : TempMute`)
                        .addField(`Modérateur :`, `<@${message.author.id}>`)
                        .addField(`Utilisateur :`, `<@${tomute.id}>`, true)
                        .addField(`ID Utilisateur :`, `${tomute.id}`)
                        .addField(`Temps :`, `${mutetime}`)
                    .setFooter(foother)
                    .setTimestamp()
                    .setColor(`#FF0000`)

                var nohastunmuted_embed = new Discord.RichEmbed()
                        .setAuthor(`Sanction révoquer : TempMute`)
                        .addField(`Modérateur :`, `<@${message.author.id}>`)
                        .addField(`Utilisateur :`, `<@${tomute.id}>`, true)
                        .addField(`ID Utilisateur :`, `${tomute.id}`)
                        .addField(`Temps du mute`, `${mutetime}`)
                    .setFooter(foother)
                    .setTimestamp()
                    .setColor(`#34C924`)
            
            if(!tomute) return message.channel.send(nomention_embed)

            if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send(noperm_embed)
             // if(tomute.hasPermission("MUTE_MEMBERS")) return message.channel.send(" **Vous ne pouvez pas réduire au silence un membre du Staff !** ")
            
            
            if(!mutetime) return message.channel.send(notime_embed)
            if(!modlog) return message.channel.send(nologschannel_embed);  
            let muterole = message.guild.roles.find("name", "Mute")
            if(!muterole){
                try{
                    muterole = await message.guild.createRole({
                        name: "Mute",
                        color: "#339999",
                        permissions: ['READ_MESSAGES'],
                    })
                    message.guild.channels.forEach(async (channel, id) => {
                        await channel.overwritePermissions(muterole, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false
                        });
                    });
                }catch(e){
                  console.log(e.stack);
                }
              }
              (tomute.addRole(muterole));
            
              modlog.send(nohastimedmute_embed)
            
             
            
            
              setTimeout(function(){
            tomute.removeRole(muterole.id);
            modlog.send(nohastunmuted_embed)
              }, ms (mutetime));

        break;

        case `unmute`:
            message.delete()

            var nomention_embed = new Discord.RichEmbed()
                .setTitle(`⚠Erreur⚠`)
                .setDescription(`Vous devez mentionner une personne afin de révoquer la sanction !`)
                .setFooter(foother)
                .setColor(`#FF0000`)
                .setTimestamp()

            if(!message.member.hasPermission(`MUTE_MEMBERS`)) return message.channel.send(noperm_embed);
            var member = message.mentions.members.first();
            if(message.mentions.users.size < 1) return message.channel.send(nomention_embed)
            //if(message.member.roles.find(`name`, `Mute`)) {
                    var unmute_embed = new Discord.RichEmbed()
                        .setAuthor(`Sanction révoquer : Mute`)
                        .addField(`Modérateur :`, `${message.author.username}#${message.author.discriminator}`)
                        .addField(`Utilisateur :`, `${user.toString()}`, true)
                        .addField(`ID Utilisateur :`, `${user.id}`)
                    .setFooter(foother)
                    .setTimestamp()
                    .setColor(`#34C924`)
                member.removeRole(roleMute)
                modlog.send(unmute_embed)
                message.channel.send(`${member.toString()} peut désormais parler !`)
            /*} else {    
                    var nonmute_embed = new Discord.RichEmbed()
                        .setTitle(`⚠Erreur⚠`)
                        .setDescription(`${user.toString()} n'est pas réduit au silence !`)
                        .setFooter(foother)
                        .setColor(`#FF0000`)
                        .setTimestamp()
                
                message.channel.send(nonmute_embed)
            } */
        break;
        
        case `kick`:
            message.delete()

                var nomention_embed = new Discord.RichEmbed()
                    .setTitle(`⚠Erreur⚠`)
                    .setDescription(`Vous devez mentionner une personne afin de l'expulser !`)
                    .setFooter(foother)
                    .setColor(`#FF0000`)
                    .setTimestamp()

            if(!message.member.hasPermission(`KICK_MEMBERS`)) return message.channel.send(noperm_embed);
            var member = message.mentions.members.first();
            if(message.mentions.users.size < 1) return message.channel.send(nomention_embed)
            if(!reason) return message.channel.send(noreason_embed)

            message.channel.send(`${member.toString()} a bien été expusler du serveur !`)

                var kick_embed = new Discord.RichEmbed()
                    .setAuthor(`Sanction : Kick`)
                        .addField(`Modérateur :`, `${message.author.username}#${message.author.discriminator}`)
                        .addField(`Utilisateur :`, `${user.toString()}`, true)
                        .addField(`ID Utilisateur :`, `${user.id}`)
                        .addField(`Raison :`, `${reason}`)
                    .setFooter(foother)
                    .setTimestamp()
                    .setColor(`#FF0000`)

            modlog.send(kick_embed)

           message.guild.member(user).send(kick_embed)

           member.kick(reason)
        break;

        case `ban`:
            message.delete()

                var nomention_embed = new Discord.RichEmbed()
                    .setTitle(`⚠Erreur⚠`)
                    .setDescription(`Vous devez mentionner une personne afin de le bannir !`)
                    .setFooter(foother)
                    .setColor(`#FF0000`)
                    .setTimestamp()

            if(!message.member.hasPermission(`BAN_MEMBERS`)) return message.channel.send(noperm_embed);
            var member = message.mentions.members.first();
            if(message.mentions.users.size < 1) return message.channel.send(nomention_embed)
            if(!reason) return message.channel.send(noreason_embed)

            message.channel.send(`${member.toString()} a bien été banni du serveur !`)

                var ban_embed = new Discord.RichEmbed()
                    .setAuthor(`Sanction : Bannissement`)
                        .addField(`Modérateur :`, `${message.author.username}#${message.author.discriminator}`)
                        .addField(`Utilisateur :`, `${user.toString()}`, true)
                        .addField(`ID Utilisateur :`, `${user.id}`)
                        .addField(`Raison :`, `${reason}`)
                    .setFooter(foother)
                    .setTimestamp()
                    .setColor(`#FF0000`)

            modlog.send(ban_embed)

            message.guild.member(user).send(ban_embed)

            member.ban(reason)
        break;
       
        case `unban`:
            message.delete()
                
                var noid_embed = new Discord.RichEmbed()
                    .setTitle(`⚠Erreur⚠`)
                    .setDescription(`Vous devez écrire l'ID de la personne à débannir !`)
                    .setFooter(foother)
                    .setColor(`#FF0000`)
                    .setTimestamp()

            if(!message.member.hasPermission(`BAN_MEMBERS`)) return message.channel.send(noperm_embed);
            let IDBanned = message.content.split(" ").slice(1);
            let suffix_IDBanned = IDBanned.join(' ')
            if(!suffix_IDBanned) return message.channel.send(noid_embed)

                var unban_embed = new Discord.RichEmbed()
                    .setAuthor(`Sanction révoquer : Ban`)
                        .addField(`Modérateur :`, `${message.author.username}#${message.author.discriminator}`)
                        .addField(`Utilisateur :`, `${suffix_IDBanned}`)
                    .setFooter(foother)
                    .setTimestamp()
                    .setColor(`#34C924`)
                
            modlog.send(unban_embed)
            guild.unban(suffix_IDBanned)
            message.channel.send(`**${suffix_IDBanned}** à bien été unban !`)
        break;       

        case `level`:
            message.delete()

        break;       

        case `messageall`:
            message.delete()
            
            if (message.author.id === `207266573835173889` || `193092758267887616`) {
                    var nomention_embed = new Discord.RichEmbed()
                        .setTitle(`⚠Erreur⚠`)
                        .setDescription(`Vous devez mentionner une personne afin de lui envoyer un MP !`)
                        .setFooter(foother)
                        .setColor(`#FF0000`)
                        .setTimestamp()

                    var notext_embed = new Discord.RichEmbed()
                        .setTitle(`⚠Erreur⚠`)
                        .setDescription(`Vous devez écrire le text que je doit envoyé à ${user.toString()} !`)
                        .setFooter(foother)
                        .setColor(`#FF0000`)
                        .setTimestamp()

                var member = message.mentions.members.first();
                if(message.mentions.users.size < 1) return message.channel.send(nomention_embed)

                let messageall = message.content.split(` `).slice(2);
                let suffix_messageall = messageall.join(` `)
                if(!suffix_messageall) return message.channel.send(notext_embed)
                message.guild.member(user).send(suffix_messageall)
            }else {       
                message.channel.send(noperm_embed)
            }
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
                            .addField(PREFIX + `level`, `**[OFF]** | Cette commande vous permet de voir votre niveau ou celui d'un autre membre.`)
                            .addField(PREFIX + `help`, `Cette commande vous permet d'affichier l'aide.`)
                            .addField(PREFIX + `messageall`, `Cette commande permet à BimoBasfaou d'envoyer un message privée à la personne mentionnée.`)
                        .setColor(`#53A338`)
                        .setFooter(foother)
                message.channel.send(help_embed)
        break;           
    }
});

bot.login(process.env.TOKEN);
