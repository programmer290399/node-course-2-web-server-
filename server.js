const express = require('express')
const fs = require('fs')
const hbs = require('hbs')

var app = express()

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine','hbs')

app.use((req,res,next)=>{
    var now = new Date().toString()

    var log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err){
            console.log("Unable to append to server.log")
        }
    })
    next()
})

app.use((req , res , next)=>{
    res.render('maintainence.hbs',{
        pageTitle : "Sorry !!",
        
        welcomeMsg :"The site is under maintainence :( , we will be back soon "
    })

})

app.use(express.static(__dirname + '/public'))


hbs.registerHelper('getCurrentYear',()=>{
     return new Date().getFullYear()
})

hbs.registerHelper("screamIt",(text)=>{
    return text.toUpperCase()
})
app.get('/',(req,res) => {

    // res.send("<h1>Hello Express !!</h1>")
    res.render('Home.hbs',{
        pageTitle : "home page",
        
        welcomeMsg :"welcome to this website"
    })


})

app.get('/about', (req,res)=>{
    res.render('about.hbs',{
        pageTitle : 'About Page'
        
    })
})

app.get('/bad',(req,res)=>{
    res.send({errorMessage : 'Unable to complete the request'})
})

app.listen(3000, ()=>{
    console.log('server is up on port 3000')
})
