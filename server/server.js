import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import api from './routes/api.js'

dotenv.config()

const app = express()

const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Hello World!')
})

app.use('/api',api)

app.listen(port,()=>{
    console.log(`server listening to http://localhost:${port}`)
})
