'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainController
 * @description
 *
 * Sample controller
 */
angular.module('kpapply')
    .controller('PlansController', ['$scope', '$http', function ($scope, $http) {

        $scope.findZipCode = function (zipCode) {
            if (angular.isUndefined($scope.zipCodes)) {
                $http.get('/data/zipCode.json').then(function (response) {
                        $scope.zipCodes = response.data;
                        $scope.findCounties(zipCode);
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
            }
        };

        $scope.getPlanNames = function (zipCode, county) {
            var planId = zipCode + "_" + county;
            if (angular.isDefined($scope.plans[planId])) {
                $scope.planNames = $scope.plans[planId].plans;
            }
            else {
                $scope.planNames = null;
            }
        }

        $scope.getPlans = function (zipCode, county) {
            if (angular.isUndefined($scope.plans)) {
                $http.get('/data/plans.json').then(function (response) {
                        $scope.plans = response.data;
                        $scope.getPlanNames(zipCode, county);
                    }
                );
            }
            else {
                $scope.getPlanNames(zipCode, county);
            }
        }

    }]);
