'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainController
 * @description
 *
 * Sample controller
 */
angular.module('kpapply')
    .controller('PlansController', ['$scope', '$http','$window', function ($scope, $http, $window) {
        $scope.counties = [];
        $scope.planNames;
        $scope.zipUrl = '/data/zipCode.json';
        $scope.plansUrl = '/data/plans.json';
        $scope.focusFlag = false;       // Used to check if user has set focus on the zipcode input for first time
        $scope.setFocusAgainIfInvalid = false;   // get focus back to zipcode if it is invalid on blur
        $scope.showNgMessage = false;   // Used to determine when to show the error messages
        $scope.dataRetrieveError = false; // used to display error if data cannot be retrieved from server

        $scope.setFocusFlag = function(){
            $scope.focusFlag = true;
            $scope.setFocusAgainIfInvalid = false;
        }

        $scope.checkToRefocus = function(zipCode){
            if($scope.focusFlag && (angular.isUndefined(zipCode) || zipCode.toString().length < 5)){
                $scope.showNgMessage = true;
                $scope.setFocusAgainIfInvalid = $scope.findPlansForm.zipCode.$invalid;
                console.log("Lets get back");
            }
        }

        $scope.hideNgMessage = function(event){
            if(event.keyCode != 9)
                $scope.showNgMessage = false;
        }

        $scope.findZipCode = function (zipCode) {
            if (angular.isUndefined($scope.zipCodes)) {
                $http.get($scope.zipUrl)
                .then(function (response) {
                        $scope.zipCodes = response.data;
                        $scope.findCounties(zipCode);
                    }, function(response){
                        console.log("hello");
                        $scope.dataRetrieveError = true;
                    }
                );
            }
            else {
                $scope.findCounties(zipCode);
            }
        }

        $scope.findCounties = function (zipCode) {
            $scope.counties = null;
            $scope.planNames = null;
            if (angular.isDefined($scope.zipCodes[zipCode])) {
                $scope.counties = $scope.zipCodes[zipCode].counties;
                if ($scope.counties.length == 1) {
                    $scope.county = $scope.counties[0];
                    $scope.getPlans($scope.zipCode, $scope.county);
                }
            }
            else {
                $scope.counties = null;
                $window.location.href = 'http://hhs.gov';
            }
            // console.log($scope.counties.length);
        };

        $scope.getPlans = function (zipCode, county) {
            if (angular.isUndefined($scope.plans)) {
                $http.get($scope.plansUrl).then(function (response) {
                        $scope.plans = response.data;
                        $scope.getPlanNames(zipCode, county);
                    }
                );
            }
            else {
                $scope.getPlanNames(zipCode, county);
            }
        }

        $scope.getPlanNames = function (zipCode, county) {
            var planId = zipCode + "_" + county;
            if (angular.isDefined($scope.plans[planId])) {
                $scope.planNames = $scope.plans[planId].plans;
            }
            else {
                $scope.planNames = null;
            }
        }
    }]);
