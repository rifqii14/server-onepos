var mysql = require('mysql');
var uuid = require('node-uuid');
var connection = require('../config/connection.js');
var knex = require('knex')(connection)
var detail = require('./pegawai.js');

module.exports = {

post: function(req,callback){

    var id = uuid.v4();
    var idd = uuid.v4();
    var alamat = req.body.alamat;
    var hp = req.body.no_hp;


    detail.postpegawai(req,function(err,result){
        knex('tbl_pegawai_hp')
            .insert({
                'id':id,
                'id_pegawai': result.id,
                'no_hp':hp
            })
            .then(function (rows){
            
            })

        knex('tbl_pegawai_alamat')
            .insert({
                'id':idd,
                'id_pegawai': result.id,
                'alamat':alamat
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

        var id = req.params.id;
        var alamat = req.body.alamat;
        var hp = req.body.no_hp;


        detail.put(req,function(err,result,rows){
            knex('tbl_pegawai_hp')
              .where('id_pegawai',id)
              .update({
                'no_hp':hp
            })
            .then(function (rows){
                
            })

            knex('tbl_pegawai_alamat')
                .where('id_pegawai',id)
                .update({
                    'alamat':alamat
                })
                .then(function (rows){
                        callback(null, rows);
                
                })
                .catch(function (err){
                    callback(err)

                });

        })
    },

    del: function(req,callback){

            var id = req.params.id;

            detail.del(req,function(err,result,rows){
                knex('tbl_pegawai_hp')
                    .whereRaw("id_pegawai = ?",[id])
                    .del()
                    .then(function (rows){
                    
                    })

                knex('tbl_pegawai_alamat')
                    .whereRaw("id_pegawai = ?",[id])
                    .del()
                    .then(function (rows){
                            callback(null, rows);
                    
                    })
                    .catch(function (err){
                        callback(err)

                    });

            })
        }
}

