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

router.get('/location', function(req, res, next) {
	res.render('location', {results: null});
});

router.get('/signUp', function(req, res, next) {
	res.render('signUp', {results: null});
});
module.exports = router;
