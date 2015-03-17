#!/usr/bin/env node

'use strict';

var request = require('request');

var rainbow = function (hash) {

    console.time('Done in');
    request('http://api.md5crack.com/crack/ba81a3fe2b049160b98f76a6/' + hash, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(JSON.parse(response.body).parsed);
        } else {
            console.log('Failed!');
        }

        console.timeEnd('Done in');
    });
};

var brute = function (hash) {

    console.time('Done in');

    console.log('Failed!');

    console.timeEnd('Done in');
};

var argv = process.argv;
var hash = argv[2];

if (!hash) {
    console.log('Invalid usage! Expected: md5hash [mode]');
    process.exit(1);
}

var howTo = argv[3] || 'rainbow';

brute(hash);

/*
switch (howTo) {
    case 'brute':
        brute(hash);
        break;
    default:
        rainbow(hash);
}
*/
