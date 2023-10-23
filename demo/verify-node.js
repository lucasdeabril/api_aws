
const TWILIO_ACCOUNT_SID = 'AC28c81c5f7e86e47f0fd9fcfa8aa9e26e'
const TWILIO_AUTH_TOKEN = '253587a6467def3a2f258fc632c113e2'//253587a6467def3a2f258fc632c113e2 4719dbd75780642f490c7d4213b51a53
const TWILIO_VERIFY_SERVICE_SID = 'VAdbbb6ea279b4c1b47c37120ff3766aee'
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const express = require('express');
const app = express();



app.get('/', (req, res) =>{
    return response.json({messege:'Sever is up'});
})

app.listen(3000)

const readline = require('readline').createInterface({
   input: process.stdin,
   output: process.stdout
});

function sendVerificationCode(phoneNumber) {
   return client.verify.v2.services(TWILIO_VERIFY_SERVICE_SID)
       .verifications
       .create({
           to: phoneNumber,
           channel: 'sms'
       }).then((data) => {
           return data.status;
       });
}

function checkVerification(phoneNumber, code) {
   return client.verify.v2.services(TWILIO_VERIFY_SERVICE_SID)
       .verificationChecks
       .create({
           to: phoneNumber,
           code: code
       }).then((data) => {
           return data.status;
       });
}

async function verifyUser(phoneNumber) {
    console.log('TWILIO_ACCOUNT_SID')
   const status = await sendVerificationCode(phoneNumber);
   if (status === 'pending') {
       readline.question('Enter code: ', code => {
           checkVerification(phoneNumber, code)
               .then((data) => {
                   if (data === 'approved') {
                       readline.write('User verified');
                       readline.close();
                   } else {
                       readline.write('User not verified');
                       readline.close();
                   }
               });
       });

   }
   else {
       return 'Error sending verification code';
   }
}

verifyUser('+5565999439793');