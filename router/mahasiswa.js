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
router.get('/api/mahasiswa', (req, res)=>{
  //call connector
  const connection = getConnection()
  //make query
  const queryCommand = "select * from mahasiswa"
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
router.get('/api/mahasiswa/:nim', (req, res)=>{
  //call connection
  const connection = getConnection()
  // make query
  const queryCommand = "select * from mahasiswa where nim = ?"
  // call parameters who input by user
  const nim = req.params.nim
  // execute query
  connection.query(queryCommand, [nim], (err, rows, fields)=>{
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
    //nim should integer
    nim: Joi.number().integer(),
    //nama should string and min length of word is 3 characther and not null
    nama: Joi.string().min(3).required(),
    //jurusan should string and min length of word is 8 characther and not null
    jurusan: Joi.string().min(2).required()
  }

  // validation data with schema rule
  return Joi.validate(body, schema)
}

//make post method
router.post('/api/mahasiswa', (req, res)=>{

  //call validasiInputMahasiswa function
  const {error} = validasiInput(req.body)
  //check data input
  if(error) return res.status(400).send(error.details[0].message)

  //call connection
  const connection = getConnection()
  //make array/parameter for data who the user will input
  const values = []
  //push data
  values.push(
    req.body.nim,
    req.body.nama,
    req.body.jurusan
  )

  const nim = req.body.nim

  //insert command (SQL) with parameter
  const queryCommand = "insert into mahasiswa (nim, nama, jurusan) values (?); select * from mahasiswa where nim = ?"

  // execute sql command
  connection.query(queryCommand, [values, nim], (err, results, fields)=>{
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
router.put('/api/mahasiswa/:nim', (req, res)=>{
  // check data input with validasiInputMahasiswa rule
  const {error} = validasiInput(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  // call connection
  const connection = getConnection()
  // make update queryCommand
  const queryCommand = "update mahasiswa set nama = ?, jurusan = ? where nim = ?;select * from mahasiswa where nim = ?"
  // make parameter
  const nim = req.params.nim
  const nama = req.body.nama
  const jurusan = req.body.jurusan

  // execute query
  connection.query(queryCommand, [nama, jurusan, nim, nim], (err, results, fields)=>{
    // if query error
    if(err){
      // show in log
      console.log(err);
      // show in interface
      res.send(err)
    }else{
      // ended the respond
    res.json(results[1])
    console.log(results[1]);
    }
  })

})

// make delete method
router.delete('/api/mahasiswa/:nim', (req, res)=>{
    // call connection
    const connection = getConnection()
    // call nim parameter
    const nim = req.params.nim
    // make query
    const querySelect = "select * from mahasiswa where nim = ?; delete from mahasiswa where nim = ?"
    // execute query
    connection.query(querySelect, [nim, nim], (err, results, fields)=>{
      // check error
      if(err){
        console.log(err);
        res.send(err)
      }else{
        // show query 1
        res.json(results[0])
        console.log(results[0]);
      }
    })

})

//export router module
module.exports = router
