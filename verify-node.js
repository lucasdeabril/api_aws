// o projeto esta salvo na pasta "api_aws" na maquina virtual da aws
const TWILIO_ACCOUNT_SID = 'AC28c81c5f7e86e47f0fd9fcfa8aa9e26e';
const https = require('https');
const codigo1 = "c57bf5f4c3fde84a";
const codigo2 = "3d9135c63a59631b";
const TWILIO_AUTH_TOKEN = codigo1 + codigo2;
const TWILIO_VERIFY_SERVICE_SID = 'VAdbbb6ea279b4c1b47c37120ff3766aee';
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const express = require('express');
const app = express();
const cors = require('cors');
const url = require('url');
const fs = require('fs');

const options = {
key: fs.readFileSync('path/to/private-key.pem'),
cert: fs.readFileSync('path/to/certificate.pem')
};

const server = https.createServer(options, app);



app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
next();
});
app.options('*', (req, res) => {
res.status(200).end();
});



app.get('/', (req, res) =>{
res.status(200).send('Se você está lendo isso, significa que estou melhorando no backend');
return response.json({messege:'Sever is up'});

});


app.post('/teste', (req, res) =>{
function sendVerificationCode(phoneNumber) {
return client.verify.v2.services(TWILIO_VERIFY_SERVICE_SID)
    .verifications
    .create({
        to: phoneNumber,
        channel: 'sms'
    }).then((data) => {
        res.status(200).send('dados enviados')
        return data.status;
    }).catch((error) => {
        console.error(error);
        res.status(500).send('Erro ao enviar o código de verificação.');
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
            res.status(200).send(`Se você está lendo isso, significa que estou melhorando no backend status: ${data.status}`);
            return data.status;
        }).catch((error) => {
            console.error(error);
            res.status(500).send('Erro ao verificar o código.');
        });
    }
    checkVerification(number,code);
})
server.listen(443, () => {
    console.log('Server is running on port 443');
});
