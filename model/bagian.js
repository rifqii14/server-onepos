var mysql = require('mysql');
var uuid = require('node-uuid');
var connection = require('../config/connection.js');
var knex = require('knex')(connection)


module.exports = {
    
    get: function (callback){
    
    knex.select().table('tbl_bagian')
        .then(function (rows){
                callback(null, rows);
            })
        .catch(function (err){
                callback(err)
            }); 
    },


    getid: function (req, callback){

    var Id = req.params.id;

    knex.select().from('tbl_bagian').whereRaw('id = ?', [Id])
        .then(function (rows){
                callback(null, rows);
            })
        .catch(function (err){
                callback(err)
            }); 

    },

    post: function (req, callback){
    var Id = uuid.v4();
    var Bagian = req.body.bagian;


    knex('tbl_bagian')
        .insert({
            'id':Id,
            'bagian':Bagian
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
    var Bagian = req.body.bagian;

    knex('tbl_bagian')
        .where('id',Id)
        .update({
            'bagian':Bagian
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
    
    knex('tbl_bagian')
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




