var mysql = require('mysql');
var uuid = require('node-uuid');
var connection = require('../config/connection.js');
var knex = require('knex')(connection)



module.exports = {
    get: function (callback){

    knex.select().table('tbl_kategori')
        .then(function (rows){
                callback(null, rows);
            })
        .catch(function (err){
                callback(err)
            }); 
    },

	getid: function (req, callback){
	var Id = req.params.id;

    knex.select().from('tbl_kategori').whereRaw('id = ?', [Id])
        .then(function (rows){
                callback(null, rows);
            })
        .catch(function (err){
                callback(err)
            }); 
	},

	post: function (req, callback){
    var Id = uuid.v4();
    var Kategori = req.body.kategori;

    knex('tbl_kategori')
        .insert({
            'id':Id,
            'kategori':Kategori
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
    var Kategori = req.body.kategori;

    knex('tbl_kategori')
        .where('id',Id)
        .update({
            'kategori':Kategori
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

    knex('tbl_kategori ')
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

