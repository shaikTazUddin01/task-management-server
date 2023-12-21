const express=require('express')
const cors=require('cors')
const port=process.env.PORT || 5000

const app=express()
//middle ware
app.use(cors())


app.get('/',(req,res)=>{
    res.send('The task manager server is Running ')
})

app.listen(port,()=>{
    console.log(`The Running server is: ${port}`)
})