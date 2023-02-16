const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
});


app.post('/contact', (req,res) => {
    if(req.body.captcha === undefined || req.body.captcha === '' || req.body.captcha === null){
        return res.json({'success' : false, 'msg': 'Please select Captcha'});    
    }
    
    const secretKey = '6LfXqmwkAAAAAAYvBoQnMDV7RmJCxrnkETvKn6nD';
    
    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret = ${secretKey}&response = ${req.body.captcha}& remoteip = ${req.socket.remoteAddress}`;

    request(verifyURL, (err, res, body)=>{
        body = JSON.parse(body);
    })

    if(body.success !== undefined && !body.success){
        return res.json({"success" : false, "msg": "Failed captcha verification"});
    }
        
    return res.json({"success" : true, "msg": "Captcha Verified"});
});
 
app.listen(3000, () => {
    console.log('Server started on port 3000');
}); 