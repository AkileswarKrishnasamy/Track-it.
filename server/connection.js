import {MongoClient,ServerApiVersion} from 'mongodb'

import dotenv from 'dotenv'
dotenv.config()

const uri = process.env.DB_URI

const client = new MongoClient(uri,{
    serverApi:{
        version:ServerApiVersion.v1,
        strict:true,
        deprecationErrors:true
    }
})

try{
     await client.connect()
    console.log('Sucessfully connected to MongoDB!')
}
catch(err){
    console.error(err)
}
const db = client.db('Expense-Tracker')
export default db