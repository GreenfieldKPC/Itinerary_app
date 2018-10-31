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

app.get('/interests')

app.get('/profile')

//req.body needs username, email, password, passwordConf
app.post('/signup', (req, res) => {
    db.createUserProfile(req.body, (err) => {
        if (err) {
            // notify user of error
            console.error(err, 'error signing up');
        }
    });
    res.end();
});

app.patch('/interests')

app.patch('/profile')

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});




