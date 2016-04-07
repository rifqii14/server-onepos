var mysql = require('mysql');
var uuid = require('node-uuid');
var connection = require('../config/connection.js');
var knex = require('knex')(connection)

module.exports = {
    get: function (callback){

        knex.select().table('tbl_meja').orderBy('nomor', 'asc')
        .join('tbl_meja_keterangan', 'tbl_meja.id_keterangan', 'tbl_meja_keterangan.id')
        .select(`tbl_meja.id`,`nomor`,`keterangan`)
        .then(function (rows){
                callback(null, rows);
            })
        .catch(function (err){
                callback(err)
            }); 

    },


    getid: function (req, callback){
    var Id =req.params.id;

    knex.select().from('tbl_meja').whereRaw('id = ?', [Id])
        .then(function (rows){
            callback(null, rows);
        })
        .catch(function (err){
            callback(err)
        }); 
    },

    post: function (req, callback){
    var Id = uuid.v4();
    var No = req.body.nomor;
    var IdKeterangan = req.body.id_keterangan;

    knex('tbl_meja')
        .insert({
            'id':Id,
            'nomor':No,
            'id_keterangan':IdKeterangan
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
    var No = req.body.nomor;
    var IdKeterangan = req.body.id_keterangan;

    knex('tbl_meja')
        .where('id',Id)
        .update({
            'nomor':No,
            'id_keterangan':IdKeterangan
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

    knex('tbl_meja')
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