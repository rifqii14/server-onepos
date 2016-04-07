var model = require('../model/admin.js');
var data = {
	"count" : 0,
	"status" : "",
	"detail" : ""
};

module.exports={
	get: 
	function (req,res) {
		model.get(req,function (error,result){
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

}