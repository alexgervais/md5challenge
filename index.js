#!/usr/bin/env node

'use strict';

console.time('Done in');

var logResultAndExit = function (result) {

    console.log(result);
    console.timeEnd('Done in');
    process.exit(0);
};

var rainbow = function (hash) {

    var request = require('request');

    var requestCallback = function (error, response) {

        var jsonbody = JSON.parse(response.body);
        var parsed = jsonbody.parsed || jsonbody.result;

        if (!error && response.statusCode == 200 && parsed) {
            logResultAndExit(parsed);
        }
    };

    request('http://api.md5crack.com/crack/ba81a3fe2b049160b98f76a6/' + hash, requestCallback);
    request('http://md5cracker.org/api/api.cracker.php?r=8316&database=md5cracker.org&hash=' + hash, requestCallback);
};

var brute = function (hash, processes, random) {

    var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    if (random) {
        chars = chars.split('').sort(function () {
            return 0.5 - Math.random()
        }).join('');
    }

    var loops = chars.length / processes;
    var cp = require('child_process');
    var childs = [];

    for (var i = 0; i < processes; i++) {
        childs.push(cp.fork(__dirname + '/lib/worker.js', [hash, chars, i * loops, (i + 1) * loops]).on('message', function (result) {

            childs.forEach(function (child) {
                child.kill('SIGTERM');
            });

            logResultAndExit(result);
        }));
    }
};

var argv = process.argv;
var hash = argv[2];

if (!hash) {
    console.log('Invalid usage! Expected: md5hash [algorithm]');
    process.exit(1);
}

var algo = argv[3] || 'brute';
var cpus = require('os').cpus().length;

switch (algo) {
    case 'brute-single':
        brute(hash.toLowerCase(), 1);
        break;
    case 'brute-random':
        brute(hash.toLowerCase(), cpus, true);
        break;
    case 'brute':
        brute(hash.toLowerCase(), 3);
        break;
    case 'rainbow':
        rainbow(hash.toLowerCase());
        break;
    default:
        console.log('Unknown algorithm ' + algo);
}

