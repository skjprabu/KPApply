/* 

Points to note :

    Only '$log' messages that are created using 'getInstance' will be decorated. 
    Others are left to be as intended by Angular, with no change.

How to use:

    1. needs 'jquery' and hopefully Angular/bootstrap downloads it. Include it in the webpage.

    2. Include the extendLog.js into the webpage.
    
    3. Create an instance of $log using :

        var logger = $log.getInstance('<some_name>')
    
    4. use the instace to log different severity messages like:
        
        logger.debug("Hi");
        logger.info("Hi");
        logger.warn("Hi");
        logger.error("Hi");
        logger.log("Hi");

    5. Create a new instance of logger for usage at different modules. 
        This is one way to keep track of the module where the log message is being originated
    
    6. $scope can't be used to point the origin of the log message


*/


// The module that provides configuring '$log'
angular.module("extendLog", ['myApp.config'])
.config(['$provide', 'GENERAL_CONFIG', function ($provide, GENERAL_CONFIG) {
    $provide.decorator('$log',  ['$delegate', 'GENERAL_CONFIG', testLogger]);
}]);

// This function is used to decorate '$log'
function testLogger($delegate, GENERAL_CONFIG){

    // Name the delegate that can be reused
    var debugFn = $delegate.debug,
        infoFn = $delegate.info,
        warnFn = $delegate.warn,
        errorFn = $delegate.error,
        logFn = $delegate.log;

    // getInstance returns the specific log as 
    $delegate.getInstance = function(context) {
        return {
            debug : enhanceLog(context, "debug"),
            info :  enhanceLog(context, "info"),
            warn :  enhanceLog(context, "warn"),
            error :  enhanceLog(context, "error"),
            log :  enhanceLog(context, "log"),
        };
    }

    function enhanceLog(context, logType){
        return function(){
            var args = [].slice.call(arguments);
            var stack = (new Error()).stack.split('\n').slice(1);
            var currDate = new Date().toString();
            args = [ currDate ,logType , context , args[0], stack[1] ];

            var msg = {
                'time': args[0],
                'Severity' : args[1],
                'component' : args[2],
                'message' : args[3],
                'extra' : args[4]
            };

            logTheData(JSON.stringify(msg), GENERAL_CONFIG);

            if(logType === "debug")
                debugFn.apply(null, args);
            else if(logType === "info")
                infoFn.apply(null, args);
            else if(logType === "warn")
                warnFn.apply(null, args);
            else if(logType === "error")
                errorFn.apply(null, args);
            else
                logFn.apply(null, args);

        };
    }

    return $delegate;
}

 /*
 *  Method to send data to be logged to server
 *  Use ajax call to send data to which ever servlet or service that can handle the data
 */
function logTheData(msg, GENERAL_CONFIG){

    if((GENERAL_CONFIG!= null) && (GENERAL_CONFIG.DEV_LOG_LOCATION != null)){
        $.get( GENERAL_CONFIG.DEV_LOG_LOCATION, {'message':msg}, function(data){
            console.log(":)");
        }).error(function(data){
            console.log(":(");
        });
    } else{
        console.log("No config set");
    }
}