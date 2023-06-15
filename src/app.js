const express = require('express');

const Router = require('./routes/router');

const app = express();
app.use(express.json());

const HOSTNAME ='localhost';
const PORT = 8000;

app.get('/',(request,response)=>{
    response.send("server is running")
});

app.use('/api',Router)
app.listen(PORT,()=>{
    console.log(`server is running > http://${HOSTNAME}:${PORT}/` )
})