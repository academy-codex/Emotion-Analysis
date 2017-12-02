var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');

var port = process.env.PORT || 3000;

var app = express();
app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/landing.html');
});

app.post('/signup', (req, res)=>{
    let user = new User({
       name: req.body.name,
       email: req.body.email,
       password: req.body.password,
    });

    user.save().then((user)=>{
       res.status(200).send(user);
    }, (error)=>{
        res.status(400).send(error);
    });
});

app.post('/signin', (req, res)=>{
   let email = req.body.email;
   let password = req.body.password;

   User.findOne({
        email: email,
        password: password
   }).then((user)=>{
       if (user === null || user === undefined)
           res.send({found: false});
       else
           res.send({
                   user:user,
                   found: true
               });
   }, (error)=>{
       res.status(400).send(error);
   })
});

app.get('/app/:id', (req, res)=>{
    let userID = req.params.id;

    if (ObjectID.isValid(userID)) {
        res.sendFile(__dirname + '/public/file.html');
    }else {
        res.status(404).send("No user found!")
    }
});

app.listen(port, ()=>{
   console.log(`Started on port ${port}`);
});


