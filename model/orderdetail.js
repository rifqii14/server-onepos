var mysql = require('mysql');
var uuid = require('node-uuid');
var connection = require('../config/connection.js');
var knex = require('knex')(connection)
var order     = require('./orders.js');

module.exports = {

    post: function(req,callback){

    var id = uuid.v4();
    var id_order = req.body.id_order;
    var id_menu = req.body.id_menu;
    var qty = req.body.qty;
    var subtotal = req.body.subtotal;
    var id_status = req.body.id_status;


    
    	order.postorder(req, function(err, result){
            knex('tbl_order_detail')
                .insert({
                    'id':id,
                    'id_order':result.id,
                    'id_menu': id_menu,
                    'qty':qty,
                    'subtotal':subtotal,
                    'id_status':id_status
                })
                .then(function (rows){
                        callback(null, rows);
                
                })
                .catch(function (err){
                    callback(err)
                });
                })

    },
    put: function(req,callback){

    var id = req.body.id;
    var id_status = req.body.id_status;



            knex('tbl_order_detail')
                .where('id',id)
                .update({
                    'id_status':id_status
                })
                .then(function (rows){
                        callback(null, rows);
                
                })
                .catch(function (err){
                    callback(err)
                });


    },

    get: function (callback){

        knex.select().table('tbl_order_detail')
        .join('tbl_menu','tbl_order_detail.id_menu', 'tbl_menu.id')
        .join('tbl_order_status', 'tbl_order_detail.id_status', 'tbl_order_status.id')
        .select(`tbl_order_detail.id as id`,`id_order`,'nama','qty','subtotal','status')
        .then(function (rows){
                callback(null, rows);
            })
        .catch(function (err){
                callback(err)
            }); 
    }


}

