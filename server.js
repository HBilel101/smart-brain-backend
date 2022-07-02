const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const register = require('./handlers/register');
const signin = require('./handlers/signin');
const profile =require('./handlers/profile');
const image = require('./handlers/image')



const postgres = knex(
    {
        client: 'pg',
        connection: {
          host : 'postgresql-cubic-76787',
          port : 5432,
          user : 'postgres',
          password : '    ',
          database : 'smart-brain'
        }
    });


const app = express();
app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.json('it works');
})
app.post('/signin',(req,res)=>{
signin.handleSignin(req,res,postgres,bcrypt);
})
app.post('/register',(req,res)=>{register.handleRegister(req,res,postgres,bcrypt)
})
app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,postgres)  
})



app.put('/image',(req,res)=>{image.handleImage(req,res,postgres)
})
app.post('/imageUrl',(req,res)=>{image.handleImageApi(req,res,postgres)
})

app.listen( 3000,()=>{
    console.log(`app is running on port 3000`);
})