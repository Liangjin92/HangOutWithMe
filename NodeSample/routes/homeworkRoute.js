var MongoClient = require('mongodb').MongoClient;

function getResults(req, db, callback) {
	var day = req.query.day;
	var time = req.query.time;
	var openTime = time.split("-")[0];
	var closeTime = time.split("-")[1];
	var query = {};
	var value1 = {};
	var value2 = {};
	value1['$gt'] = openTime;
	value2['$gt'] = closeTime;
	var key1 = 'hours.'+day+'.open';
	var key2 = 'hours.'+day+'.close';
	query[key1] = value1;
	query[key2] = value2;
	var cursor =db.collection('business').find(query);
	var results = [];
	cursor.each(function(err, doc) {
		if (doc != null) {
			//console.log(doc);
			results.push(doc.name);
		} else {
			callback(results);
		}
	});
};

function generateResponse(req, res) {
	// The url to connect to the mongodb instance
	var url = 'mongodb://cis550student:cis550hw3@ds051933.mongolab.com:51933/cis550hw3';
	MongoClient.connect(url, function(err, db) {
		// If there is an error, log the error and render the error page 
		if(err != null) {
			console.log("Connection to server failed.");
			db.close();
			res.render('error', {
				message: "Connection to server failed.",
				error: err
			});
		}
		// If there is no error while connecting, proceed further
		else {
			console.log("Connected correctly to server.");
			getResults(req, db, function(results) {
				db.close();
				res.render('homework.ejs', {results: results});
			});
		}
	});
}

exports.displayResponse = function(req, res){
	generateResponse(req, res);
};