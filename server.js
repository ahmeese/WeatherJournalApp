// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express =require('express')
// Start up an instance of app
const app =express()


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser =require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors =require("cors")
app.use(cors())


// Initialize the main project folder
app.use(express.static('website'));


// get  route to send data to the client server
app.get('/getData', (req,res)=>{
    res.send(projectData)

})

//post route to receive data from the client server 
app.post('/addData',(req,res)=>{
    projectData=req.body
    console.log("Data has been received sucessfully :")
    console.log(projectData)
})


//using the environment port or the port 3000 (if there is no env port)
const port= process.env.PORT || 3000


//launching the server
app.listen(port, () => {
  console.log(`App is working and listening at http://localhost:${port}`)
})