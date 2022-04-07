
const { token } = require('./config.json')
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const Support = "<@944246654821875803>"
const ReactCrop = require('react-image-crop')
const sprite = require('sprite')
const client = new Discord.Client({
    intents : [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.GUILD_BANS,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    ],
     allowedMentions: { parse: ['users', 'roles', 'everyone'], repliedUser: true}

})

const Tesseract = require("tesseract.js");
const screenshot = require('desktop-screenshot');
const sharp = require("sharp");
async function screenShot() {
    setInterval(() => {
        
   
    screenshot("screenshot.jpg", {quality: 100}, function(error, complete) {
        if(error) {
            console.log("Screenshot failed", error);
        } else {
            sharp("screenshot.jpg").extract({ width: 445, height: 415, left: 1318, top: 195}).toFile("cropped-image.jpg");
        }
    })
 }, 2000);
}

screenShot()
.then(res => {      
    async function a() {
        var response = await Tesseract.recognize("./cropped-image.jpg", "eng")
        console.log(response.data.text)
        setInterval(() => {
            const channel = client.channels.cache.get('960725302546415708');
            const Log = new MessageEmbed()
            .setAuthor({name: 'Log this wood'})
            .addFields(
                {name: `Logged:`, value: `**${response.data.text}**`}
            )
            channel.send({embeds: [Log]})
            
        }, 2000);
        
    }
    a()
});

client.login(token)