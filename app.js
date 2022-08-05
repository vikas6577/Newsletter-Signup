const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const e = require("express");
const app=express();

app.use(express.static("public"));  // if you want to use static file than u need to use this like in this for signup page we are using style.css which is static so to use it we create a seperate folder called public and considering inside the public folder we give the relative address to the css file(css/style.css )
app.use(bodyParser.urlencoded({extended:true}))
const port=3000;

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html") 
})
app.post("/",function(req,res){
    var firstName=req.body.fName;
    var lastName=req.body.lName;
    var email=req.body.email;
    // console.log(firstName,lastName,email)

    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };
    
    var jsonData=JSON.stringify(data);

    var options={
        url:"https://us17.api.mailchimp.com/3.0/lists/c8c399c8ad",
        method:"POST",
        headers:{
            "Authorization":"vikas1 43d2f1ae47e82f2dcd4936f229a04cdb-us17"
        },
        body:jsonData
    };
    request(options,function(error,response,body){
        if(error){
            console.log(error);
            // res.send("Error in the signing up,please try again!");
            res.sendFile(__dirname+"/failure.html");
        }
        else{
            // console.log(response.statusCode);
            if(response.statusCode==200){ 
            // res.send("Successfully subscribed");
            res.sendFile(__dirname+"/success.html");
            }
            else{
                // res.send("There was an error in signingup, Please try again")
                res.sendFile(__dirname+"/failure.html");
            }
        }
    })
})

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(req,res){
    console.log("Server is running on port "+port)
})
// app.listen(port,function(req,res){
//     console.log("Server is running on port "+port)
// })



// key=43d2f1ae47e82f2dcd4936f229a04cdb-us17

// listid=c8c399c8ad