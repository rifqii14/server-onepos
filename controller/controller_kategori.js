var model = require('../model/kategori.js');


var data = {
	"count" : 0,
	"status" : "",
	"detail" : ""
	
};


module.exports={
	get: 
	function (req,res) {
		model.get(function (error,result){
			if(result.length == 0){
				data["count"] = result.length;
				data["status"] = "error";
				data["detail"] = error;
			}
			else{
				data["count"] = result.length;
				data["status"] = "success";
				data["detail"] = result;
			}
			res.json(data);
		});

	},

	getid: 
	function (req,res) {
		model.getid(req, function (error,result){
			if(result.length == 0){
				data["count"] = result.length;
				data["status"] = "error";
				data["detail"] = error;
			}
			else{
				data["count"] = result.length;
				data["status"] = "success";
				data["detail"] = result;
			}
			res.json(data);
		});

	},

	post: 
	function (req,res) {
		model.post(req, function (error,result){
			if(result.length == 0){
				data["count"] = result.length;
				data["status"] = "error";
				data["detail"] = error;
			}
			else{
				data["count"] = result.length;
				data["status"] = "success";
				data["detail"] = result;
			}
			res.json(data);
		});

	},

	put: 
	function (req,res) {
		model.put(req, function (error,result){
			if(result.length == 0){
				data["count"] = result.length;
				data["status"] = "error";
				data["detail"] = error;
			}
			else{
				data["count"] = result.length;
				data["status"] = "success";
				data["detail"] = result;
			}
			res.json(data);
		});

	},

	del: 
	function (req,res) {
		model.del(req, function (error,result){
			if(result.length == 0){
				data["count"] = result.length;
				data["status"] = "error";
				data["detail"] = error;
			}
			else{
				data["count"] = result.length;
				data["status"] = "success";
				data["detail"] = result;
			}
			res.json(data);
		});

	}


}