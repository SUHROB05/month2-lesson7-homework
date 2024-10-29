import express from "express"

import registrRouter from './router/user.routes.js'

const app = express()
app.use(express.json())

app.use('/users', registrRouter)


app.listen(5003, ()=>{
    console.log("port : 5003");
})