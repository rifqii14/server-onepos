var mysql = require('mysql');
var uuid = require('node-uuid');
var connection = require('../config/connection.js');
var knex = require('knex')(connection)


module.exports = {
    get: function (callback){

        knex.select().table('tbl_menu')
        .join('tbl_menu_ketersediaan', 'tbl_menu.id_ketersediaan ', 'tbl_menu_ketersediaan.id')
        .join('tbl_kategori', 'tbl_menu.id_kategori', 'tbl_kategori.id')
        .select(`tbl_menu.id`,`kategori`,`ketersediaan`,`nama`,`foto`,`harga`,`notes`)
        // .select(`tbl_menu.id`,`id_kategori`,`ketersediaan`,`nama`,`foto`,`diskon`,`harga`,`notes`)
        .then(function (rows){
                callback(null, rows);
            })
        .catch(function (err){
                callback(err)
            }); 
    },


    getid: function (req, callback){
    var Id =req.params.id;

    knex.select().table('tbl_menu')
    .whereRaw('id = ?', [Id])
        .then(function (rows){
                callback(null, rows);
            })
        .catch(function (err){
                callback(err)
            }); 

    },

    available: function (callback){
        knex.select().table('tbl_menu')
        .join('tbl_menu_ketersediaan', 'tbl_menu.id_ketersediaan ', 'tbl_menu_ketersediaan.id')
        .join('tbl_kategori', 'tbl_menu.id_kategori', 'tbl_kategori.id')
        .whereRaw('ketersediaan= "Tersedia"')
        .select(`tbl_menu.id`,`kategori`,`ketersediaan`,`nama`,`foto`,`harga`,`notes`)
        // .select(`tbl_menu.id`,`id_kategori`,`ketersediaan`,`nama`,`foto`,`diskon`,`harga`,`notes`)
        .then(function (rows){
                callback(null, rows);
            })
        .catch(function (err){
                callback(err)
            }); 
    },

    post: function (req, callback){
    var Id = uuid.v4();
    var IdKategori = req.body.id_kategori;   
    var IdKetersediaan = req.body.id_ketersediaan;
    var Nama = req.body.nama;
    var Foto = req.body.foto;
    // var Diskon = req.body.diskon;
    var Harga = req.body.harga;
    var Notes = req.body.notes;

    knex('tbl_menu')
        .insert({
            'id':Id,
            'id_kategori':IdKategori,
            'id_ketersediaan':IdKetersediaan,
            'nama':Nama,
            'foto':Foto,
            'harga':Harga,
            'notes':Notes
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
    var IdKategori = req.body.id_kategori;   
    var IdKetersediaan = req.body.id_ketersediaan;
    var Nama = req.body.nama;
    var Foto = req.body.foto;
    // var Diskon = req.body.diskon;
    var Harga = req.body.harga; 
    var Notes = req.body.notes;

    // knex.raw('UPDATE tbl_menu SET id_kategori=?, id_ketersediaan=?, nama=?, foto=?, diskon=?, harga=?, notes=?  WHERE id=?', [IdKategori, IdKetersediaan, Nama, Foto, Diskon, Harga, Notes, Id])
    knex('tbl_menu')
        .where('id',Id)
        .update({
            'id_kategori':IdKategori,
            'id_ketersediaan':IdKetersediaan,
            'nama':Nama,
            'foto':Foto,
            'harga':Harga,
            'notes':Notes
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

    knex('tbl_menu')
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