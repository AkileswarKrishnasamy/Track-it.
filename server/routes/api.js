import express from 'express'

import db from '../connection.js'
import { ObjectId } from 'mongodb';

const router = express.Router()


//Reading the documents from database
router.get('/expenses/:id',async (req,res)=>{
    const collection = await db.collection('Expenses');
    const results = await collection.find({'userId':req.params.id}).toArray();
    res.status(200).json(results)
})


//Creating a document
router.post('/create',async(req,res)=>{
    try{
        console.log(req.body)
        const collection = await db.collection('Expenses')
        const results = await collection.insertOne(req.body)
        res.json(results)
    }
    catch(err){
        res.status(400).send(err)
    }
})

//Getting a particular document form database
router.get('/expenses/one/:id',async(req,res)=>{
    try{
        const query = {_id:new ObjectId(req.params.id)}
        const collection = await db.collection('Expenses')
        const results = await collection.findOne(query)
        res.json(results)
    }
    catch(err){
        res.status(400).send(err)
    }
})

//Deleting a document from database
router.delete('/delete/:id',async(req,res)=>{
    try{
        const collection = await db.collection('Expenses')
        const query = {_id:new ObjectId(req.params.id)}
        const results = await collection.deleteOne(query)
        res.send(results)
    }
    catch{
        res.send('Error deleting')
    }
})


//Updating a document form database
router.put('/update/:id',async(req,res)=>{
    try{
        const query = {_id:new ObjectId(req.params.id)}
        const updates = {
        $set: {
            name: req.body.name,
            amount: Number(req.body.amount),
            method: req.body.method
        }
    }

        const collection = await db.collection('Expenses')
        const results = await collection.updateOne(query,updates)
        res.send(results)
    }
    catch(err){
        res.send(err)
    }
})

//Delete all records fro database
router.delete('/reset/:id',async(req,res)=>{
    try{
        
        const query = {'userId':req.params.id}
        const collection = await db.collection('Expenses')
        const results = await collection.deleteMany(query)
        res.send(results)
    }
    catch(err){
        res.send(err)
    }
})



export default router
