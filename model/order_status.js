var mysql = require('mysql');
var uuid = require('node-uuid');
var connection = require('../config/connection.js');
var knex = require('knex')(connection)


module.exports = {
    get: function (callback){

        knex.select().table('tbl_order_status')
        .then(function (rows){
                callback(null, rows);
            })
        .catch(function (err){
                callback(err)
            }); 
    },


    getid: function (req, callback){
    var Id =req.params.id;

    knex.select().from('tbl_order_status').whereRaw('id = ?', [Id])
        .then(function (rows){
                callback(null, rows);
            })
        .catch(function (err){
                callback(err)
            }); 
    },

    post: function (req, callback){
    var Id = uuid.v4();
    var Status = req.body.status;

    knex('tbl_order_status')
        .insert({
            'id':Id,
            'status':Status
        })
        .then(function (rows){
                callback(null, rows);
            })
        .catch(function (err){
                callback(err)
            }); 

    },

    put: function (req, callback){
    var Id = req.params.id;
    var Status = req.body.status;

    knex('tbl_order_status')
        .where('id',Id)
        .update({
            'status':Status
         })
        .then(function (rows){
                callback(null, rows);
            })
        .catch(function (err){
                callback(err)
            }); 

    },

    del: function (req, callback){
    var Id = req.params.id;

    knex('tbl_order_status')
        .whereRaw("id = ?",[Id])
        .del()
        .then(function (rows){
                callback(null, rows);
            })
        .catch(function (err){
                callback(err)
            }); 

    }

}