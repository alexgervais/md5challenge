'use strict';

(function () {

    var hash = process.argv[2];
    var chars = process.argv[3];
    var from = parseInt(process.argv[4]);
    var to = parseInt(process.argv[5]);

    var crypto = require('crypto');
    var charCount = chars.length;

    for (var i = from; i < to; i++) {
        for (var j = 0; j < charCount; j++) {
            for (var k = 0; k < charCount; k++) {
                for (var l = 0; l < charCount; l++) {
                    for (var m = 0; m < charCount; m++) {
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
