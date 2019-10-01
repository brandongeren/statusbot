const Discord = require('discord.js');
let request = require(`request`);
let fs = require(`fs`);

function download(url, filename){
    request.get(url)
        .on('error', console.error)
        .pipe(fs.createWriteStream(filename));
    return true;
}

async function findCommands(msg, client) {
  let content = msg.content;
  let validTokens = ["!"];
  let cmdToken = content.charAt(0);
  if (!validTokens.includes(cmdToken)) {
    return;
  }
  
  // chop off the command token
  content = content.substring(1);
  
  let command = content.split(' ')[0].toLowerCase();
  let target = content.substring(content.indexOf(' ') + 1);

  if (target === content) {
    target = ' ';
  }

  if (!command || !target) {
    return;
  }

  let name = msg.member && msg.member.user && msg.member.user.username;
  let status = '';
  // noelle
  let channelID = '628386980178427914';

  // dueling sim
  // let channelID = '628376170605445141';
  let channel = client.channels.get(channelID);

  switch(command) {
    case 'trivia':
    case 'triv':
    case 't':
      // do the trivia
      // TODO: make the names work
      status = 'daily ' + name + ' trivia: ' + target;
      channel.send(status);
      break;
    case 'anthem':
    case 'a':
      // do an anthem
      status = 'daily ' + name + ' anthem: ' + target;


      let attachment = msg.attachments && msg.attachments.first();
      if (attachment) {
        console.log('attachment found');
        await download(attachment.url, attachment.filename)
        console.log('download complete');
        await channel.send(status, { files: [`./${attachment.filename}`] });
        console.log('message sent');
        fs.unlinkSync(`./${attachment.filename}`, (err) => {
          if (err) {
            console.error(err);
            console.log(err);
          }
        });   
      } else {
        channel.send(status);
      }
      // message.channel.send(new Discord.Attachment('./emojis/killerbean.png', 'killerbean.png') ).catch(console.error);
      // TODO: if there is an attachment, then post it
      break;
    case 'name':
    case 'n':
      // rename the user
      break;
    case 'update':
    case 'status':
    case 's':
    case 'u':
      status = name + ' says: ' + target;
      // write a general update
      channel.send(status);
      break;
    default:
      // send error message in current channel saying command not recognized
      break;
  }
}

exports.findCommands = findCommands;
