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
router.get('/api/transaksi', (req, res)=>{
  //call connector
  const connection = getConnection()
  //make query
  const queryCommand = "select * from transaksi"
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
router.get('/api/transaksi/:kodeTransaksi', (req, res)=>{
  //call connection
  const connection = getConnection()
  // make query
  const queryCommand = "select * from transaksi where kodeTransaksi = ?"
  // call parameters who input by user
  const kodeTransaksi = req.params.kodeTransaksi
  // execute query
  connection.query(queryCommand, [kodeTransaksi], (err, rows, fields)=>{
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
    //kodeTransaksi should integer
    kodeTransaksi: Joi.noTransaksi().integer(),
    //jenisTransaksi should string and min length of word is 3 characther and not null
    jenisTransaksi: Joi.string().min(3).required(),
    //tanggal should string and min length of word is 8 characther and not null
    tanggalTransaksi: Joi.string().min(8).required(),
    //bayar should string and min length of word is 3 characther and not null
    bayar: Joi.string().min(3).required(),
    //jurusan should string and min length of word is 8 characther and not null
    nim: Joi.string().min(8).required()
  }

  // validation data with schema rule
  return Joi.validate(body, schema)
}

//make post method
router.post('/api/transaksi', (req, res)=>{

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
    req.body.kodeTransaksi,
    req.body.jenisTransaksi,
    req.body.tanggalTransaksi,
    req.body.bayar,
    req.body.nim
  )

  const kodeTransaksi = req.body.kodeTransaksi

  //insert command (SQL) with parameter
  const queryCommand = "insert into transaksi (kodeTransaksi, jenisTransaksi, tanggalTransaksi, bayar, nim) values (?); select * from mahasiswa where nim = ?"

  // execute sql command
  connection.query(queryCommand, [values, kodeTransaksi], (err, results, fields)=>{
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
router.put('/api/transaksi/:kodeTransaksi', (req, res)=>{
  // check data input with validasiInputMahasiswa rule
  const {error} = validasiInput(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  // call connection
  const connection = getConnection()
  // make update queryCommand
  const queryCommand = "update transaksi set jenisTransaksi = ?, tanggalTransaksi = ?, bayar = ?, nim = ? where kodeTransaksi = ?;select * from transaksi where kodeTransaksi = ?"
  // make parameter
  const kodeTransaksi = req.params.kodeTransaksi
  const jenisTransaksi = req.body.jenisTransaksi
  const tanggalTransaksi =req.body.tanggalTransaksi
  const bayar = req.body.bayar
  const nim = req.body.nim

  // execute query
  connection.query(queryCommand, [jenisTransaksi, tanggalTransaksi, bayar, nim, kodeTransaksi, kodeTransaksi], (err, results, fields)=>{
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
router.delete('/api/transaksi/:kodeTransaksi', (req, res)=>{
    // call connection
    const connection = getConnection()
    // call nim parameter
    const kodeTransaksi = req.params.kodeTransaksi
    // make query
    const querySelect = "select * from transaksi where kodeTransaksi = ?; delete from transaksi where kodeTransaksi = ?"
    // execute query
    connection.query(querySelect, [kodeTransaksi, kodeTransaksi], (err, results, fields)=>{
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
