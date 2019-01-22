const express = require('express');
const app = express();
const morgan = require('morgan')

// for detail information user activity
app.use(morgan('combined'))

// call mahasiswa.js
const routerMahasiswa = require('./router/mahasiswa.js')
app.use(routerMahasiswa)

// call bank.js
const routerBank = require('./router/akun.js')
app.use(routerBank)

// call transaksi.js
const routerTransaksi = require('./router/transaksi.js')
app.use(routerTransaksi)
// Start the server on dinamic port or 3030
const port = process.env.PORT || 3030
//make port listener for localhost
app.listen(port, ()=>{
  console.log(`port ${port} was listened`);
});
