describe('Decorator log', function() {
  var testObject, log;
  // load the angular.module using angular-mocks
  beforeEach(module('extendLog'));
  
  // before each spec runs
  beforeEach(inject(function(_$log_) {
    log = _$log_;
  }));

  beforeEach(function(){
  	testObject = log.getInstance("test");
  });

  // the specs will be here
  it('should log something', function() {
  	testObject.debug("alpha");
  	expect(log.debug.logs.length).toEqual(1);
	});

  // the specs will be here
  it('should have 5 features like context, message, ...', function() {
  	testObject.debug("alpha");
  	expect(log.debug.logs[0].length).toEqual(5);
  });

  // the specs will be here
  it('should call "logthedata" function', function() {
  	var logTheDataCaller = spyOn(window, "logTheData");
  	testObject.debug("alpha");
	  expect(logTheDataCaller).toHaveBeenCalled();
	});	

  it('should call "logthedata" function to have been called with parameters', function() {
  	 var parameters = {};
  	var logTheDataCaller = spyOn(window, "logTheData").and.callFake(function(params) {
    	parameters = JSON.parse(params);
    });

  	testObject.debug("alpha");
	   expect(logTheDataCaller).toHaveBeenCalled();

	});	


  
  it('decorated debug should also be logged', function(){
  	testObject.debug("hi");
  	expect(log.debug.logs[0].length).toEqual(5);
  	expect(log.debug.logs[0][1]).toEqual("debug");
  });
  it('info should also be decorated', function(){
  	testObject.info("hi");
  	expect(log.info.logs[0].length).toEqual(5);
  	expect(log.info.logs[0][1]).toEqual("info");
  });

  it('warn should also be decorated', function(){
  	testObject.warn("hi");
  	expect(log.warn.logs[0].length).toEqual(5);
  	expect(log.warn.logs[0][1]).toEqual("warn");
  });
  it('error should also be decorated', function(){
  	testObject.error("hi");
  	expect(log.error.logs[0].length).toEqual(5);
  	expect(log.error.logs[0][1]).toEqual("error");
  });
  it('log should also be decorated', function(){
  	testObject.log("hi");
  	expect(log.log.logs[0].length).toEqual(5);
  	expect(log.log.logs[0][1]).toEqual("log");
  });
});