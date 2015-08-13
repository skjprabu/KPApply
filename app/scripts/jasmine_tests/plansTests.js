describe('PlansController', function() {

    var scope, $http, $httpBackend, createController, url;
    var chosenZip = "80226";
    var chosenCounty = "Denver";
    var countiesData = {
        "80226": {
            "counties": ["Denver", "Jefferson"]
        },
        "80439": {
            "counties": ["Clear Creek", "Jefferson"]
        },
        "80015": {
            "counties": ["Arapahoe"]
        }
    };
    var plansData = {
        "80226_Denver": {
            "plans": ["DenverPlanA", "DenverPlanB"]
        },
        "80226_Jefferson": {
            "plans": ["JeffersonPlanA", "JeffersonPlanB"]
        },
        "80439_Clear Creek": {
            "plans": ["Clear CreekPlanA", "Clear CreekPlanB"]
        },
        "80439_Jefferson": {
            "plans": ["JeffersonPlanA", "JeffersonPlanB"]
        },
        "80015_Arapahoe": {
            "plans": ["ArapahoePlanA", "ArapahoePlanB"]
        }
    };

    // apply working module
    beforeEach(module('kpapply'));

    // get the http and httpbackend providers
    beforeEach(inject(function(_$http_, _$httpBackend_) {
        $http = _$http_;
        $httpBackend = _$httpBackend_;
    }));

    // get scope and controller from provider
    beforeEach(inject(
        function($rootScope, $controller) {
            scope = $rootScope.$new();
            createController = function() {
                return $controller('PlansController', {
                    '$scope': scope
                });
            };
        }));

    it('check if we got counties', function() {
        var controller = createController();
        $httpBackend.whenGET(scope.zipUrl).respond(countiesData);
        scope.findZipCode(chosenZip);
        $httpBackend.flush();
        expect(scope.counties.length).toEqual(2);
    });

    it("lets check findCounties directly with valid zip", function() {
        var controller = createController();
        scope.zipCodes = countiesData;
        scope.findCounties(chosenZip);
        expect(scope.counties.length).toEqual(2);
    });

    it("lets check findCounties directly with undefined zip to return null", function() {
        var controller = createController();
        scope.zipCodes = countiesData;
        scope.findCounties();
        expect(scope.counties).toEqual(null);
    });

    it("lets check getPlans if it is working", function(){
        var controller = createController();
        $httpBackend.whenGET(scope.plansUrl).respond(plansData);
        scope.getPlans("80015", countiesData["80015"]["counties"][0]);
        $httpBackend.flush();
        expect(scope.plans).toEqual(plansData);
    });

    it("lets check getPlanNames", function() {
        var controller = createController();
        $httpBackend.whenGET(scope.plansUrl).respond(plansData);
        scope.getPlans("80226", countiesData["80226"]["counties"][0]);
        $httpBackend.flush();
        expect(scope.planNames).toEqual(plansData["80226_Denver"]["plans"]);
    });

    afterEach(function() {
        if (!scope.$$phase) {
            //$digest or $apply
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        }
    });
});