require('dotenv').config();
const database = require('./database');
var _ = require('lodash');
const memoize = require("memoizee");
var memProfile = require('memoizee/profile');

var fn = function() {
	return 20;
};

const memoized = memoize(fn);

console.log(memoized());
console.log(memoized());
console.log(memoized());

memProfile.statistics; // Statistics accessible for programmatic use
console.log(memProfile.log()); // Output statistics data in readable form