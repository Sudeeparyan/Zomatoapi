var express = require('express');
const app = express();
const port = process.env.PORT||8000;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const mongourl="mongodb+srv://Sudeep:vnktsbhg9@cluster0.rvlj3.mongodb.net/Zomato?retryWrites=true&w=majority"
var db;

app.get('/',(req,res)=>{
    res.send("Welcome to Api ")
})

app.get('/cuisine',(req,res)=>{
    db.collection('cuisine').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

app.get('/location',(req,res)=>{
    db.collection('location').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})



// //List restaurants wtr to city
// app.get('/restaurants/:cityId',(req,res)=>{
//     var cityId= req.params.cityId;
//     db.collection('restaurants').find({city:cityId}).toArray((err,result)=>{
//         if(err) throw err;
//         res.send(result)
//     })
// })


// query example
app.get('/restaurants',(req,res)=>{
    var cityId= req.params.cityId?req.query.cityId:"2";
    db.collection('restaurants').find({city:cityId}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})


//list of all QuickSearch
app.get('/quicksearch',(req,res)=>{
    db.collection('mealType').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

MongoClient.connect(mongourl,(err,client)=>{
    if(err) console.log("Error While Connecting");
    db =client.db('Zomato');
    app.listen(port,()=>{
        console.log(`listening on port no ${port}`)
    })
})
