var mysql = require('mysql');
var uuid = require('node-uuid');
var connection = require('../config/connection.js');
var knex = require('knex')(connection)

module.exports = {
    get: function (callback){

        knex.select().table('tbl_meja_keterangan')
        .then(function (rows){
                callback(null, rows);
            })
        .catch(function (err){
                callback(err)
            }); 

    },


    getid: function (req, callback){
    var Id =req.params.id;

    knex.select().from('tbl_meja_keterangan').whereRaw('id = ?', [Id])
    .then(function (rows){
            callback(null, rows);
        })
    .catch(function (err){
            callback(err)
        }); 

    },

    post: function (req, callback){
    var Id = uuid.v4();
    var Keterangan = req.body.keterangan;

    knex('tbl_meja_keterangan')
        .insert({
            'id':Id,
            'keterangan':Keterangan
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
    var Keterangan = req.body.keterangan;

    knex('tbl_meja_keterangan')
        .where('id',Id)
        .update({
            'keterangan':Keterangan
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

    knex('tbl_meja_keterangan')
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