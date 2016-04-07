var uuid = require('node-uuid');
var mysql = require('mysql');
var connection = require('../config/connection.js');
var knex = require('knex')(connection)


	module.exports = {

        get: function (callback){
            knex.select().table('tbl_pajak_master')
            .then(function (rows){
                    callback(null, rows);
                })
            .catch(function (err){
                    callback(err)
                }); 
        },

		getid: function(req,callback){
			var Id=req.params.id;


            knex.select().from('tbl_pajak_master ').whereRaw('id = ?', [Id])
            .then(function (rows){
                    callback(null, rows);
                })
            .catch(function (err){
                    callback(err)
                }); 

		},

	post: function (req, callback){
    var Id = uuid.v4();
    var Pajak = req.body.pajak;

    knex('tbl_pajak_master')
        .insert({
            'id':Id,
            'pajak':Pajak
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
    var Pajak = req.body.pajak;

    knex('tbl_pajak_master')
        .where('id',Id)
        .update({
            'pajak':Pajak
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

     knex('tbl_pajak_master')
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