var request = require('request');
var result;

var flattenObject = function(ob) {
  var toReturn = {};
  
  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;
    
    if ((typeof ob[i]) == 'object') {
      var flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        
        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};

var readPrice = function (opts, paramName){
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      result = JSON.parse(body);
      result = flattenObject(result);
      console.log(result[paramName]);
    }
  });
};

/* ETHEREUM PRICE.org
var options = {
  uri: 'https://ethereumprice.org/wp-content/themes/theme/inc/exchanges/price-data.php?coin=eth&c=ethusd&ex=waex&dec=2',
  method: 'GET'
};
readPrice(options, "current_price");
*/

var options = {
  uri: "https://api.coinbase.com/v2/exchange-rates?currency=ETH",
  method: 'GET'
};

options.uri = "https://api.coinbase.com/v2/exchange-rates?currency=ETH"
readPrice(options, 'data.rates.USD');