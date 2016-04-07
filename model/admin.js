var mysql = require('mysql');
var uuid = require('node-uuid');
var connection = require('../config/connection.js');
var knex = require('knex')(connection)


module.exports = {

    get: function (req, callback){
    var Id = req.query.id;
    var pass = req.query.password;

    if(Id && pass){
        knex('tbl_admin')
        .whereRaw('id= ?', [Id])
        .whereRaw('password= ?',[pass])
        .then(function (rows){
                    callback(null, rows);
                })
        .catch(function (err){
                    callback(err)
                }); 
    }

    else if(!Id && !pass){
        knex.select().table('tbl_admin')
        .then(function (rows){
                callback(null, rows);
            })
        .catch(function (err){
                callback(err)
            });   
    }
     
    },

    getid: function(req, callback){
    var Id=req.params.id;
        
        knex.select().table('tbl_admin').whereRaw('id=?',[Id])
            .then(function(rows){
                callback(null,rows);
        })
            .catch(function(err){
                callback(err);
        })
    }

}




