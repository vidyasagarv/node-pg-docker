'use strict';

const express = require('express');
const app = express();
let bodyParser = require('body-parser');
let ejs = require('ejs');
let pg = require('pg');

let client = new pg.Client('postgres://localhost:5432/postgres');

let votes = {
	facts: 0,
	altfacts: 0
};

client.connect(function (err) {
	if (err) throw err;
	client.query('SELECT number_of_votes FROM votes', function (err, result) {
		if (err) throw err;

		votes.facts = result.rows[0].number_of_votes;
		votes.altfacts = result.rows[1].number_of_votes;
	});
});

let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', function(req, res){
	res.render('pages/index', {
		votes: votes
	});
});

app.post('/vote', urlencodedParser, function(req, res){
	let vote = req.body.yourVote;
	if (vote === 'facts') {
		votes.facts = votes.facts + 1;
		client.query('UPDATE votes SET number_of_votes=\'' + votes.facts 
			+ '\' WHERE option_name=\'facts\'', function(err, result){
				if (err) throw err;
			});
	} else if (vote == 'altfacts') {
		votes.altfacts = votes.altfacts + 1;
		client.query('UPDATE altfacts SET number_of_votes=\'' + votes.altfacts
			+ '\' WHERE option_name=\'altfacts\'', function(err, result){
				if (err) throw err;
			});
	} else{
		console.log('Something went wrong: vote contains ' + vote);
	}
	res.redirect('/');
});

const PORT = 8888;
app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
