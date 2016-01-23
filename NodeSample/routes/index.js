var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('homepage');
});

router.get('/references', function(req, res, next) {
	res.render('references');
});

router.get('/sample', function(req, res, next) {
	res.render('sample', {results: null});
});

router.get('/yourwork', function(req, res, next) {
	res.render('yourwork', {results: null});
});

router.get('/login', function(req, res, next) {
	res.render('login', {results: null});
});

module.exports = router;
