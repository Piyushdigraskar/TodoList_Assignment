import express from 'express';
import dotenv from 'dotenv';
import initDb from './database.js';

dotenv.config();
const app = express();
app.use(express.json());


let db;
initDb().then((database)=>{
    db = database;
    console.log(`database initialized and connected`);
})

app.listen(process.env.PORT, ()=>{
    console.log('Site is running on port 5000');
})