const express = require('express');
const body_parser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const {response} = require("express");
const register = require('./controllers/register');
const image = require('./controllers/image');
const profile = require('./controllers/profile');
const signin = require('./controllers/signin');


const db =knex({
        client: 'pg',
        connection: {
            host : '127.0.0.1',
            port : 5432,
            user : '', // Owner of the database
            password : '',
            database : 'smart-brain'
        }

    }
);

const app = express();
app.use(body_parser.json());
app.use(cors());


// CRUD operations
app.post('/signin', signin.handleSignin(db,bcrypt));

app.post('/register', register.handlerRegister(db,bcrypt));

app.get('/profile/:id',profile.handlerProfileGet(db));

app.put('/image', image.handleImage(db));

app.listen(3000, () => {
    console.log('App is running on 3000');
})




// Api Design
/**
 *
 * / --> res = Get -> This is working
 * /signin --> POST -> Success/Fail
 * /register --> POST -> User
 * /profile/:userId --> GET = user
 * /image --> PUT --> user
 *
 * */