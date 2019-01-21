const express = require('express');
const mysql = require('mysql')
const router = express.Router();
const Joi = require('joi')

// Turn on JSON body parsing for REST services
router.use(express.json())
// Turn on URL-encoded body parsing for REST services
router.use(express.urlencoded({ extended: true }));

// make connection
const pool = mysql.createPool({
  host:'localhost',
  user:'root',
  password:'',
  database:'pembayaran',
  multipleStatements: true
})

function getConnection(){
  return pool
}

// get data
router.get('/api/bank', (req, res)=>{
  //call connector
  const connection = getConnection()
  //make query
  const queryCommand = "select * from bank"
  // execute query
  connection.query(queryCommand, (err, rows, fields) =>{
    // check the error
    if(err){
      console.log("connection failed with "+err);
    }else{
    // send the rows
    res.json(rows)
    console.log(rows);
    }
  })
})

// search data
router.get('/api/bank/:noRekening', (req, res)=>{
  //call connection
  const connection = getConnection()
  // make query
  const queryCommand = "select * from bank where noRekening = ?"
  // call parameters who input by user
  const noRekening = req.params.noRekening
  // execute query
  connection.query(queryCommand, [noRekening], (err, rows, fields)=>{
    // check the error
    if(err){
      console.log("error with "+err);
    }else{
    //send the rows
    res.json(rows)
    console.log(rows);
    }
  })
})

//filter data input from user
function validasiInput(body){
  // make array for data
  const schema = {
    //no rekening should integer
    noRekening: Joi.number().integer(),
    //saldo should string and min length of word is 3 characther and not null
    saldo: Joi.number().integer().min(3).required(),
  }

  // validation data with schema rule
  return Joi.validate(body, schema)
}

//make post method
router.post('/api/bank', (req, res)=>{

  //call validasiInput function
  const {error} = validasiInput(req.body)
  //check data input
  if(error) return res.status(400).send(error.details[0].message)

  //call connection
  const connection = getConnection()
  //make array/parameter for data who the user will input
  const values = []
  //push data
  values.push(
    req.body.noRekening,
    req.body.saldo
  )

  const noRekening = req.body.noRekening

  //insert command (SQL) with parameter
  const queryCommand = "insert into bank (noRekening, saldo) values (?); select * from bank where noRekening = ?"

  // execute sql command
  connection.query(queryCommand, [values, noRekening], (err, results, fields)=>{
    //if this command have error when execute query with parameter
    if(err){
      // show error in log
      console.log("connection error with "+err);
      // show error to interface
      res.send(err)
    }else{
      // show data json in query 2
      res.json(results[1])
      console.log(results[1]);
    }
  })
})

// make update method
// with parameter in url
router.put('/api/bank/:noRekening', (req, res)=>{
  // check data input with validasiInput rule
  const {error} = validasiInput(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  // call connection
  const connection = getConnection()
  // make update queryCommand
  const queryCommand = "update bank set Saldo = ? where noRekening = ?;select * from bank where noRekening = ?"
  // make parameter
  const noRekening = req.params.noRekening
  const saldo = req.body.saldo

  // execute query
  connection.query(queryCommand, [saldo, noRekening, noRekening], (err, results, fields)=>{
    // if query error
    if(err){
      // show in log
      console.log(err);
      // show in interface
      res.send(err)
    }else{
      // ended the respond
    res.json(results[1])
    }
  })

})

// make delete method
router.delete('/api/bank/:noRekening', (req, res)=>{
    // call connection
    const connection = getConnection()
    // call nim parameter
    const noRekening = req.params.noRekening
    // make query
    const querySelect = "select * from bank where noRekening = ?; delete from bank where noRekening = ?"
    // execute query
    connection.query(querySelect, [noRekening, noRekening], (err, results, fields)=>{
      // check error
      if(err){
        console.log(err);
        res.send(err)
      }else{
        // show query 1
        res.json(results[0])
      }
    })

})

//export router module
module.exports = router
