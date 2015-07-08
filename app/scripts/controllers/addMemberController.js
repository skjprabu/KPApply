'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:AddMemberController
 * @description
 *
 * Add Member controller
 */
angular.module('kpapply')
    .controller('AddMemberController', ['$scope', function ($scope) {
        $scope.memberData = {'previous_customer': 'Yes'};


        $scope.addMember = function (){
            console.log("adding member");
        };
    }]);
