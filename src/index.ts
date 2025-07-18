import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from "dotenv"
import { AppDataSource } from './db'
import { authenticateToken, notFoundResponse } from './utils'

// Setting up web server
const app = express()
app.use(express.json())
app.use(morgan('short'))
app.use(cors())

// Reading env variables
dotenv.config();
const port = Number(process.env.SERVER_PORT);

// Connect to database
AppDataSource.initialize()
    .then(() => {
        console.log('Connected to database');
        app.listen(port, '0.0.0.0', () => console.log(`Listening on port ${port}`));
    })
    .catch((error) => console.log(error))

app.use(authenticateToken)

// Default not found page
app.get('{/*path}', function (req, res) {
    notFoundResponse(res)
});

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});