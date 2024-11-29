import express from 'express';
import dotenv from 'dotenv';
import initDb from './database.js';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes.js'

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


export let db;
initDb().then((database)=>{
    db = database;
    console.log(`database initialized and connected`);
})

app.use('/api', todoRoutes);

app.listen(process.env.PORT, ()=>{
    console.log('Site is running on port 5000');
})