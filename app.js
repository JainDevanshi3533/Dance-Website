const express=require('express');
const path =require('path');
const app=express();
const port = 80;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser:true});

//Define mongoose schema...
var contactSchema = new mongoose.Schema({
    name:String,
    phone: String,
    email:String,
    address:String, 
    desc:String
});
var Contact= mongoose.model('Contact', contactSchema);

//express specific stuff
app.use('/static',express.static('static_f'))
app.use(express.urlencoded());

//pug specific stuff
app.set('view-engine','pug');
app.set('views',path.join(__dirname,'views'))


//endpoints...
app.get('/',(req,res)=>{
    const con ="This is the best content on the internet so far so use it wisely";
    const params={'title': 'this Dance academy is the best', 'content':con};
    // res.status(200).render('index.pug',params);
    res.status(200).render('home.pug',params);
})

app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug');
});

app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved.");
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
})

//start the server..
app.listen(port , ()=>{
    console.log(`the application started successfully on port ${port}`);
});