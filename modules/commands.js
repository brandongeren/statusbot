function findCommands(msg) {
  let validTokens = ["!"];
  let cmdToken = msg.charAt(0);
  if (!validTokens.includes(cmdToken)) {
    return;
  }
  
  // chop off the command token
  msg = msg.substring(1);
  
  let command = msg.split(' ')[0];
  let target = msg.substring(msg.indexOf(' ') + 1);

  if (!command || !target) {
    return;
  }

  switch(command) {
    case 'trivia':
    case 'triv':
    case 't':
      // do the trivia
      break;
    case 'anthem':
    case 'a':
      // do an anthem
      break;
    case 'name':
    case 'n':
      // rename the user
      break;
    case 'update':
    case 'status':
    case 's':
    case 'u':
      // write a general update with no message
      break;
    default:
      // send error message in current channel saying command not recognized
  }
}

exports.findCommands = findCommands;
