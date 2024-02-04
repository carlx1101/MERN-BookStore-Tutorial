import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import { mongoose } from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();


// Middleware for parsing request body 
app.use(express.json());

// Middleware for handling CORS Policy 
// Option 1 : Allow all origins with default of cors(*)
app.use(cors());

// Option 2 : Allow custom origin - better as more control 
// app.use(cors({
//     origin:'http://localhost:3000',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type'],
// }));




app.get('/', (request, response)=>{
    console.log(request)
    return response.status(234).send('welcome to mern');
});

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('app connected to db');
        app.listen(PORT, ()=>{
            console.log(`App is listening: ${PORT}`)
        });

    })
    .catch((error)=>{
        console.log(error)
    });
