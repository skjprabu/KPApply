'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:AddMemberController
 * @description
 *
 * Add Member controller
 */
angular.module('kpapply')
    .controller('AddMemberController', ['$scope', '$log', function ($scope, $log) {
        $scope.memberData = {'gender': 'Male', 'previous_customer': 'Yes'};


        $scope.addMember = function (){
            console.log("adding member");
        };

        var logger = $log.getInstance('MainController');
        logger.info("Checking message");

    }]);
