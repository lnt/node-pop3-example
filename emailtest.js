

import {simpleParser} from 'mailparser';
import PopNode from 'node-pop3';
import tls from 'tls';
console.log(tls.getCiphers())

//--- initialise emailobject:
const pop3Command = new PopNode({
  user: 'email@email.com', //email id or userid
  password: "*******",// password or app passcode
  host: 'outlook.office365.com', //for outlook
  host: 'pop.gmail.com', // for gmail server
  port : 110,  // or 995
  //port : 995,  
  tls : true, 
  //timeout : 2*1000,
  tlsOptions : {
    //ciphers:'aes128-gcm-sha256',
    //ciphers:'SSLv3_method'
  }
});

try {
  console.log("--- fetch list of all emails")
  //let emailsList = await pop3Command.UIDL();  // 
  console.log("--- fetch the email content")
  let msg = await pop3Command.RETR(1);  // 
  //console.log("msg====",msg)
  console.log("--- convert into readable email content  ")
  let parsedEmail = await simpleParser(msg);  // 

      console.log(parsedEmail)

  //await pop3Command.DELE(parsedEmail.messageId);  // 
  await pop3Command.QUIT();

} catch(e){
  console.log("error",e)
} finally {
    console.log("finally")
}
