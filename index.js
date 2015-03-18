#!/usr/bin/env node

'use strict';

var rainbow = function (hash) {

    console.time('Done in');

    var request = require('request');
    request('http://api.md5crack.com/crack/ba81a3fe2b049160b98f76a6/' + hash, function (error, response, body) {
        var parsed = JSON.parse(response.body).parsed;
        if (!error && response.statusCode == 200 && parsed) {
            console.log(parsed);
        } else {
            console.log('Failed!');
        }

        console.timeEnd('Done in');
    });
};

var brute = function (hash, processes) {

    console.time('Done in');

    var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var loops = chars.length / processes;

    var cp = require('child_process');
    var childs = [];

    for (var i = 0; i < processes; i++) {
        childs.push(cp.fork(__dirname + '/lib/worker.js', [hash, chars, i * loops, (i + 1) * loops]).on('message', function (result) {

            console.log(result);

            childs.forEach(function (child) {
                child.kill('SIGTERM');
            });

            console.timeEnd('Done in');

            process.exit(0);
        }));
    }
};

var argv = process.argv;
var hash = argv[2];

if (!hash) {
    console.log('Invalid usage! Expected: md5hash [mode]');
    process.exit(1);
}

var howTo = argv[3] || 'rainbow';

switch (howTo) {
    case 'brute-single':
        brute(hash.toLowerCase(), 1);
        break;
    case 'brute':
        var cpus = require('os').cpus().length;
        brute(hash.toLowerCase(), cpus);
        break;
    case 'rainbow':
        rainbow(hash.toLowerCase());
        break;
    default:
        console.log('Unknown algorithm ' + howTo);
}

