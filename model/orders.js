var mysql = require('mysql');
var uuid = require('node-uuid');
var connection = require('../config/connection.js');
var knex = require('knex')(connection)


module.exports = {
    get: function (callback){

        knex.select().table('tbl_order')
        .join('tbl_meja', 'tbl_order.id_meja ', 'tbl_meja.id')
        .select(`tbl_order.id`,'nomor',`total_qty`,`total_harga`)
        .then(function (rows){
                callback(null, rows);
            })
        .catch(function (err){
                callback(err)
            }); 
    },

    getid: function (req, callback){

        var Id = req.params.id;

        knex.select().table('tbl_order')
        .join('tbl_meja', 'tbl_order.id_meja ', 'tbl_meja.id')
        .join('tbl_order_detail', 'tbl_order.id', 'tbl_order_detail.id_order')
        .join('tbl_menu','tbl_order_detail.id_menu', 'tbl_menu.id')
        .join('tbl_order_status', 'tbl_order_detail.id_status', 'tbl_order_status.id')
        .whereRaw('tbl_order.id = ?', [Id])
        .select(`tbl_order_detail.id as id`,`id_order`,'nomor','nama','qty','subtotal',`total_qty`,`total_harga`,'status')
        .then(function (rows){
                callback(null, rows);
            })
        .catch(function (err){
                callback(err)
            }); 
    },

    postorder : function(req,callback){

    var id = uuid.v4();
    var id_meja = req.body.id_meja;
    var waktu = new Date();
    var total_qty = req.body.total_qty;
    var total_harga = req.body.total_harga;
    var data = {
    			'id':id,
    			'id_meja':id_meja,
    			'waktu_pemesanan': waktu,
    			'total_qty':total_qty,
    			'total_harga':total_harga
    }
    	
    	knex('tbl_order')
    		.insert(data)
    		.then(function (rows){
    				callback(null, data);
    		
    	})
    		.catch(function (err){
    			callback(err)
    		})
    }

}

