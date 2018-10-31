const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/index');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/../client')));


app.get('/')

app.get('/search')

app.get('/profile')

// query database by username, receive array of interests
app.get('/interests', (req, res) => {
    db.getUserInterests(req.query.username, (err, interests) => {
        if (err) {
            // notify user of error
            console.error(err, 'error getting interests');
            res.send(err);
        } else {
            // return array of interests
            res.send(interests);
        }
    });
});

//req.body needs username, email, password, passwordConf (short for password confirmation)
app.post('/signup', (req, res) => {
    db.createUserProfile(req.body, (err) => {
        if (err) {
            // notify user of error
            console.error(err, 'error signing up');
        }
    });
    res.end();
});

// req.body needs username and interest with value of interest that was clicked
app.patch('/interests', (req, res) => {
    db.updateInterests(req.body, (err) => {
        if (err) {
            // notify user of error
            console.error(err, 'error updating interest');
        }
    });
    res.end();
});

// req.body needs username and update object with property and new value
app.patch('/profile', (req, res) => {
    db.updateProfile(req.body.username, req.body.update, (err) => {
        if (err) {
            // notify user of error
            console.error(err, 'error updating profile');
        }
    });
    res.end();
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});




