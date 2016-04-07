var app = require('express')();
var http = require('http').Server(app);
var mysql = require('mysql');
var bodyParser = require("body-parser");



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/*module export*/
var division = require('./controller/controller_bagian.js');
var category = require('./controller/controller_kategori.js');
var employee = require('./controller/controller_pegawai.js');
var employeedetail = require('./controller/controller_pegawaidetail.js');
var table = require('./controller/controller_meja.js');
var tableinfo = require('./controller/controller_mejaketerangan.js');
var tax = require('./controller/controller_pajak.js');
var availablemenu  = require('./controller/controller_menuketersediaan.js');
var orderstatus  = require('./controller/controller_orderstatus.js');
var menu  = require('./controller/controller_menu.js');
var orders  = require('./controller/controller_orders.js');
var detail  = require('./controller/controller_orderdetail.js');
var admin  = require('./controller/controller_admin.js');


app.get('/api', function (req ,res){
	res.send('API ONEPOS');
});

//---------------Tabel Admin----------------//
app.get('/api/admins', admin.get)
app.get('/api/admins/:id', admin.getid)
//--------------------------------------------//

//---------------Tabel Bagian----------------//
app.get('/api/divisions', division.get)
app.get('/api/division/:id', division.getid)
app.post('/api/divisions', division.post)
app.put('/api/division/:id', division.put)
app.delete('/api/division/:id', division.del)	
//--------------------------------------------//

//---------------Tabel Kategori----------------//
app.get('/api/categories', category.get)
app.get('/api/category/:id', category.getid)
app.post('/api/categories', category.post)
app.put('/api/category/:id', category.put)
app.delete('/api/category/:id', category.del)
//--------------------------------------------//



//---------------Tabel Meja Keterangan----------------//
app.get('/api/tables/information', tableinfo.get)
app.get('/api/table/information/:id', tableinfo.getid)
app.post('/api/tables/information', tableinfo.post)
app.put('/api/table/information/:id', tableinfo.put)
app.delete('/api/table/information/:id', tableinfo.del)
//--------------------------------------------//

//---------------Tabel Meja----------------//
app.get('/api/tables', table.get)
app.get('/api/table/:id', table.getid)
app.post('/api/tables', table.post)
app.put('/api/table/:id', table.put)
app.delete('/api/table/:id', table.del)
//--------------------------------------------//

//---------------Tabel Pajak ----------------//
app.get('/api/taxes',tax.get);
app.get('/api/tax/:id',tax.getid);
app.post('/api/taxes',tax.post);
app.put('/api/tax/:id',tax.put);
app.delete('/api/tax/:id',tax.del);
//---------------------------------------------//

//---------------Tabel Menu ----------------//
app.get('/api/menus',menu.get);
app.get('/api/menu/:id',menu.getid);
app.get('/api/menus/available',menu.available);
app.post('/api/menus',menu.post);
app.put('/api/menu/:id',menu.put);
app.delete('/api/menu/:id',menu.del);
//--------------------------------------------//

//---------------Tabel Menu Ketersediaan----------------//
app.get('/api/menus/status',availablemenu.get);
app.get('/api/menu/status/:id',availablemenu.getid);
app.post('/api/menus/status',availablemenu.post);
app.put('/api/menu/status/:id',availablemenu.put);
app.delete('/api/menu/status/:id',availablemenu.del);
//--------------------------------------------//


//---------------Tabel Order Status ----------------//
app.get('/api/orders/status',orderstatus.get);
app.get('/api/order/status/:id',orderstatus.getid);
app.post('/api/orders/status',orderstatus.post);
app.put('/api/order/status/:id',orderstatus.put);
app.delete('/api/order/status/:id',orderstatus.del);
//--------------------------------------------//

//---------------Tabel Pegawai----------------//
app.get('/api/employees', employee.get)
app.get('/api/employee/:id', employee.getid)
app.get('/api/employee', employee.pelayan)
app.get('/api/kitchen', employee.dapur)
app.post('/api/employees',employeedetail.post)
app.put('/api/employee/:id', employeedetail.put)
app.delete('/api/employee/:id', employee.del)
//--------------------------------------------//

//---------------Tabel Orders----------------//
app.get('/api/orders', orders.get)
app.get('/api/order/:id', orders.getid)
// app.post('/api/orders',orders.postorder)
app.get('/api/order_detail',detail.get)
app.post('/api/orders',detail.post)
app.put('/api/order/:id',detail.put)
//--------------------------------------------//
app.listen(3000);
 console.log("Berjalan di port 3000");
