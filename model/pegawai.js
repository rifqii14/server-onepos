var mysql = require('mysql');
var uuid = require('node-uuid');
var connection = require('../config/connection.js');
var knex = require('knex')(connection)


module.exports = {
    get: function (callback){

    knex('tbl_pegawai')
   .join('tbl_pegawai_alamat', 'tbl_pegawai.id ', 'tbl_pegawai_alamat.id_pegawai')
   .join('tbl_pegawai_hp', 'tbl_pegawai.id' , 'tbl_pegawai_hp.id_pegawai')
   .join('tbl_bagian', 'tbl_pegawai.id_bagian', `tbl_bagian.id`)
   .select('tbl_pegawai.id','nip','password','nama','kelamin','agama','tgl_lahir','bagian','alamat','no_hp')
        .then(function (rows){
                callback(null, rows);
            })
        .catch(function (err){
                callback(err)
            }); 
  },

    getid: function (req, callback){
    var Id =req.params.id;

    knex('tbl_pegawai')
      .join('tbl_pegawai_alamat', 'tbl_pegawai.id ', 'tbl_pegawai_alamat.id_pegawai')
      .join('tbl_pegawai_hp', 'tbl_pegawai.id' , 'tbl_pegawai_hp.id_pegawai')
      .join('tbl_bagian', 'tbl_pegawai.id_bagian', `tbl_bagian.id`)
      .whereRaw('tbl_pegawai.id = ?', [Id])
      .select('tbl_pegawai.id','nip','password','nama','kelamin','agama','tgl_lahir','bagian','alamat','no_hp')
      .then(function (rows){
                callback(null, rows);
            })
      .catch(function (err){
                callback(err)
            }); 
},

   pelayan: function (req, callback){
    var nip=req.query.nip;
    var pass=req.query.pass;

    knex('tbl_pegawai')
    .join('tbl_pegawai_alamat', 'tbl_pegawai.id ', 'tbl_pegawai_alamat.id_pegawai')
    .join('tbl_pegawai_hp', 'tbl_pegawai.id' , 'tbl_pegawai_hp.id_pegawai')
    .join('tbl_bagian', 'tbl_pegawai.id_bagian', `tbl_bagian.id`)
    .whereRaw('nip= ?', [nip])
    .whereRaw('password= ?',[pass])
    .whereRaw('bagian= "Pelayan"')
    .select('tbl_pegawai.id','nip','password','nama','kelamin','agama','tgl_lahir','bagian','alamat','no_hp')
    .then(function (rows){
                callback(null, rows);
            })
    .catch(function (err){
                callback(err)
            }); 
},

   dapur: function (req, callback){
    var nip=req.query.nip;
    var pass=req.query.pass;

    knex('tbl_pegawai')
    .join('tbl_pegawai_alamat', 'tbl_pegawai.id ', 'tbl_pegawai_alamat.id_pegawai')
    .join('tbl_pegawai_hp', 'tbl_pegawai.id' , 'tbl_pegawai_hp.id_pegawai')
    .join('tbl_bagian', 'tbl_pegawai.id_bagian', `tbl_bagian.id`)
    .whereRaw('nip= ?', [nip])
    .whereRaw('password= ?',[pass])
    .whereRaw('bagian= "Dapur"')
    .select('tbl_pegawai.id','nip','password','nama','kelamin','agama','tgl_lahir','bagian','alamat','no_hp')
    .then(function (rows){
                callback(null, rows);
            })
    .catch(function (err){
                callback(err)
            }); 
},

postpegawai : function(req,callback){
    var id = uuid.v4();
    var Nip = req.body.nip;
    var Pass = req.body.password;
    var Nama = req.body.nama;
    var Kelamin = req.body.kelamin;
    var Agama = req.body.agama;
    var TglLahir = req.body.tgl_lahir;
    var Idbagian = req.body.id_bagian;
    var data = {
            'id': id,
            'nip': Nip,
            'password':Pass,
            'nama':Nama,
            'kelamin':Kelamin,
            'agama':Agama,
            'tgl_lahir':TglLahir,
            'id_bagian':Idbagian
    }

    knex('tbl_pegawai')
        .insert(data)
        .then(function (rows){
                callback(null,  data);
            })
        .catch(function (err){
                callback(err)
            }); 
    },

    put: function (req, callback){
     var id = req.params.id;
     var Nip = req.body.nip;
     var Pass = req.body.password;
     var Nama = req.body.nama;
     var Kelamin = req.body.kelamin;
     var Agama = req.body.agama;
     var TglLahir = req.body.tgl_lahir;
     var Idbagian = req.body.id_bagian;


     knex('tbl_pegawai')
        .where('id',id)
        .update({
            'nip': Nip,
            'password':Pass,
            'nama':Nama,
            'kelamin':Kelamin,
            'agama':Agama,
            'tgl_lahir':TglLahir,
            'id_bagian':Idbagian
      })
         .then(function (rows){
                 callback(null, rows);
             })
         .catch(function (err){
                 callback(err)
             }); 


     },

    del: function (req, callback){
    var id = req.params.id;

    knex('tbl_pegawai')
        .whereRaw("id = ?",[id])
        .del()
        .then(function (rows){
                callback(null, rows);
            })
        .catch(function (err){
                callback(err)
            }); 
        }
}
 



