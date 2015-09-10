// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var request = require('request');
var fs = require('fs');

fs.readFile(__dirname+'/../archives/sites.txt', 'utf8', function(err,data) {

  var arrayOfSites = (data === '') ? [] : data.split("\n");

  arrayOfSites.forEach(function(url) {
    if (url==='') return;

    request('http://'+url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        fs.open(__dirname+'/../archives/sites/'+url, "w", function(err, fd) {
          fs.write(fd, body);
        });
      } else {
        fs.open(__dirname+'/../archives/sites/'+url, "w", function(err, fd) {
          fs.write(fd, url +' was unavailable');
        });
      }
    });

  });

});
