/**
 * Created by Sakari.Ruoho on 20/04/2015.
 */
/****                                                                          ****/
/****  Each IRC message may consist of up to three main parts: the prefix      ****/
/****  (OPTIONAL), the command, and the command parameters (maximum of         ****/
/****  fifteen (15)).  The prefix, command, and all parameters are separated   ****/
/****  by one ASCII space character (0x20) each.                               ****/
/****                                                                          ****/

// http://calebdelnay.com/blog/2010/11/parsing-the-irc-message-format-as-a-client
exports.parseMessage = function(message) {
    var prefix, command, params = [], trailing;
    var splitMessage = message.trim().split(" ");
    var trailingIndex = message.indexOf(" :");
    if (trailingIndex !== -1) { // has trailing?
        trailing = message.substring(trailingIndex + 2, message.length); // save trailing
        splitMessage = message.substring(0, trailingIndex).split(" "); // modify split so that trailing is excluded
        //TODO: here you could limit trailing to certain length.
    }
    if (splitMessage[0].substring(0, 1) == ":") { //has prefix?
        prefix = splitMessage[0];
        command = splitMessage[1];
        params = splitMessage.splice(2, splitMessage.length);
    } else {
        command = splitMessage[0];
        params = splitMessage.splice(1, splitMessage.length);
    }
    return {prefix: prefix, command: command, params: params, trailing: trailing}
}