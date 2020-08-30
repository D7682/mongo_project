const dotenv = require('dotenv').config({path: './config/.env'});
const mongoose = require('mongoose');
const People = require('./models/Person');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/', (req, res) => {
    People.find({}, (err, models) => {
        if(err){
            res.send(err)
        } else {
            res.send(models);
        }
    })
})

app.post('/', (req, res) => {
    if(req.body.name && req.body.age){
        let newPerson = new People({
            name: req.body.name,
            age: JSON.parse(req.body.age)
        })
        newPerson.save();
        res.send("The person was saved to the mongodb database")
    } else {
        res.send("There was an error")
    }
})

mongoose.connect(process.env.MongoURL, {useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("MongoDB has connected successfully"))
.catch((err) => console.log(err))

const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})