const express=require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const {MONGODB_ATLAS_URL,DB_NAME} = process.env

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

mongoose.connect(MONGODB_ATLAS_URL,{dbName: DB_NAME})
.then(()=>console.log("Databse connected Successfully"))
.catch((e)=>console.log(`Error in Databse Connection ${e}`))

const accountSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    mobile : String,
    age : String
})

const Account = mongoose.model("account",accountSchema);


//get all accounts
app.get("/accounts",(req,res)=>{
    Account.find((err,result)=>{
        if(err){
            res.send({error: err})
        }else{
            if(result.length===0){
                res.send({msg: "No Accounts to Fetch"});
            }else{
                res.send(result);
            }
            
        }
    });
})

app.get("/accounts/:mobile",(req,res)=>{
    Account.findOne({mobile:req.params.mobile},(err,foundAccount)=>{
        if(err){
            res.send({error: err});
        }else{
            if(foundAccount){
                res.send({
                    ...foundAccount,
                    msg: "Account Found"});
            }else{
                res.send({msg: "Account does not exist"});
            }
        }
    })
})

// Create a new Account

app.post("/accounts",(req,res)=>{

    const enteredMobile = req.body.mobile;
    //console.log(req);

    Account.findOne({mobile: enteredMobile},(err,foundAccount)=>{
        if(err){
            res.send({error: err});
        }else{
            if(foundAccount){
                res.send({msg: "Account Already Present"});
            }
            else{
                const newAccount = new Account({
                    firstName: req.body.firstName,         
                    lastName: req.body.lastName,
                    mobile: req.body.mobile,
                    age: req.body.age
                });
                newAccount.save((err)=>{
                    if(err){
                        res.send({error: err});
                    }else{
                        res.send({msg: "Account Inserted Successfully"});
                    }
                })
            }
        }
    })

    
})

// Update Account

app.put("/accounts/:mobile",(req,res)=>{

    Account.findOneAndUpdate({mobile: req.params.mobile},req.body,(err,foundAccount)=>{
        if(err){
            res.send({error: "Error in Updating" + err});
        }else{
            if(foundAccount){
                res.send({msg: "Updated Successfully"});
            }else{
                res.send({msg: "Account not present"});
            }
        }
    })
})

// Delete Account

app.delete("/accounts/:mobile",(req,res)=>{
    Account.findOneAndDelete({mobile: req.params.mobile},(err,doc)=>{
        if(err){
            res.send({error:"Error in Deleting" + err});
        }else{
            if(doc){
                res.send({msg: "Account Deleted Successfully"});
            }else{
                res.send({msg: "Account does not exist"});
            }
        }
    })
})


app.listen("3001",()=>{
    console.log("Server started on port 3001");
})

