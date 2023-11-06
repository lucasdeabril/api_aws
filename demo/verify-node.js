
const TWILIO_ACCOUNT_SID = 'AC28c81c5f7e86e47f0fd9fcfa8aa9e26e'
const TWILIO_AUTH_TOKEN = 'f65ed959aa4480518c95c6413d576121'//VIVE MUDANDO, PEGAR UM NOVO NA PARTE INICIAL DO CONSOLE DA TWILIO;
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


app.post('/teste', (req, res) =>{
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
    

    

    sendVerificationCode(`${req.body.number}`);
    
})

app.get('/teste1', (req,res) =>{
    const number = req.body.number;
    const code = req.body.code;
    let checkVerification = (number, code)=> {
    return client.verify.v2.services(TWILIO_VERIFY_SERVICE_SID)
        .verificationChecks
        .create({
            to: number,
            code: code
        }).then((data) => {
            console.log(data)
            return data.status;
        });
    }
    checkVerification(number,code)
})


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/`);
  });