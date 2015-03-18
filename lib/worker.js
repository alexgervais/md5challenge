'use strict';

(function () {

    var hash = process.argv[2];
    var chars = process.argv[3];
    var from = parseInt(process.argv[4]);
    var to = parseInt(process.argv[5]);

    var crypto = require('crypto');

    for (var i = from; i < to; i++) {
        for (var j = 0; j < chars.length; j++) {
            for (var k = 0; k < chars.length; k++) {
                for (var l = 0; l < chars.length; l++) {
                    for (var m = 0; m < chars.length; m++) {
                        var word = chars[i] + chars[j] + chars[k] + chars[l] + chars[m];
                        if (crypto.createHash('md5').update(word).digest('hex') === hash) {
                            return process.send(word);
                        }
                    }
                }
            }
        }
    }

})();
