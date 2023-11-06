
const TWILIO_ACCOUNT_SID = 'AC28c81c5f7e86e47f0fd9fcfa8aa9e26e'
const TWILIO_AUTH_TOKEN = '43888979ca488c6954ad8cd2397a34e4'//253587a6467def3a2f258fc632c113e2 4719dbd75780642f490c7d4213b51a53
const TWILIO_VERIFY_SERVICE_SID = 'VAdbbb6ea279b4c1b47c37120ff3766aee'
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const express = require('express');
const app = express();
const url = require('url');
const PORT = 3000;
app.use(express.json());
app.options('*', (req, res) => {
    res.status(200).end();
  });



app.get('/', (req, res) =>{
    res.status(200).send('Se você está lendo isso, significa que estou melhorando no backend');
    return response.json({messege:'Sever is up'});
    
})

app.get('/teste', (req, res) =>{
    // return response.json({messege:'Sever is up'});
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
    const number = req.body.number;
    const code = req.body.code;
    function checkVerification(number, code) {
    return client.verify.v2.services(TWILIO_VERIFY_SERVICE_SID)
        .verificationChecks
        .create({
            to: number,
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

    verifyUser('+55'+ `${req.body.number}`);
    
})

app.get('/send-otp', (req,res) =>{
    const number = req.body.number;
    const code = req.body.code;
    function checkVerification(number, code) {
    return client.verify.v2.services(TWILIO_VERIFY_SERVICE_SID)
        .verificationChecks
        .create({
            to: number,
            code: code
        }).then((data) => {
            return data.status;
        });
    }
})


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/`);
  });