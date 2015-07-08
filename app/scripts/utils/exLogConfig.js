
var config_module = angular.module('myApp.config', []);

var config_data = {
  'GENERAL_CONFIG': {
    'DEV_LOG_LOCATION': '/log',
    'APP_VERSION': '0.1'
  }
}
angular.forEach(config_data,function(key,value) {
  config_module.constant(value,key);
});



/**
 *  source : 
 *  http://www.ng-newsletter.com/advent2013/#!/day/5
 *  http://www.kidsil.net/2013/07/adding-config-to-your-angularjs-app/
**/