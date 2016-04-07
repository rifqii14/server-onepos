var mysql = require('mysql');
var uuid = require('node-uuid');
var connection = require('../config/connection.js');
var knex = require('knex')(connection)


module.exports = {
    get: function (callback){

    knex.select().table('tbl_menu_ketersediaan')
        .then(function (rows){
                callback(null, rows);
            })
        .catch(function (err){
                callback(err)
            }); 
    },


    getid: function (req, callback){
    var Id =req.params.id;

    knex.select().from('tbl_menu_ketersediaan').whereRaw('id = ?', [Id])
        .then(function (rows){
                callback(null, rows);
            })
        .catch(function (err){
                callback(err)
            }); 
    },

    post: function (req, callback){
    var Id = uuid.v4();
    var Ketersediaan = req.body.ketersediaan;

    knex('tbl_menu_ketersediaan')
        .insert({
            'id':Id,
            'ketersediaan':Ketersediaan
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
    var Ketersediaan = req.body.ketersediaan;

    knex('tbl_menu_ketersediaan')
        .where('id',Id)
        .update({
            'ketersediaan':Ketersediaan
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

    knex('tbl_menu_ketersediaan')
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