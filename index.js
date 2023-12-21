const express = require('express')
const cors = require('cors');
//require mongodb
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000
require('dotenv').config()
const app = express()
//middle ware
app.use(express.json());
app.use(cors());


console.log(process.env.DB_USER)

// // mongodb connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.25fgudl.mongodb.net/?retryWrites=true&w=majority`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {

    try {
        const taskDB = client.db("taskManagement").collection('createTask');


        app.post('/createTask', async (req, res) => {
            const newTask = req.body;
            const result = await taskDB.insertOne(newTask)
            console.log(newTask)
            res.send(result)
        })
// get task
        app.get('/createTask',async(req,res)=>{
            const result=await taskDB.find().toArray()

            console.log(result)
            res.send(result)
        })


        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);









app.get('/', (req, res) => {
    res.send('The task manager server is Running ')
})

app.listen(port, () => {
    console.log(`The Running server is: ${port}`)
})