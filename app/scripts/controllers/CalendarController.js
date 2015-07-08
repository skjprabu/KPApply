/**
 * Created by andrew.boorde on 7/8/2015.
 */
'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CalendarCtrl
 * @description
 *
 * Calendar controller
 */
angular.module('kpapply')
    .controller('CalendarController', function ($scope) {
        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.format = 'dd/MM/yyyy';
        $scope.maxDate = $scope.maxDate ? null : new Date();
    });