'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:AddMemberController
 * @description
 *
 * Add Member controller
 */
angular.module('kpapply')
    .controller('AddMemberController', ['$scope', '$log','$http', function ($scope, $log, $http) {
        $scope.memberData = {'gender': 'Male', 'previous_customer': 'Yes'};
        var logger = $log.getInstance('addMemberCOntroller');
        logger.info("alpha");


        $scope.addMember = function (memberData){
            logger.info("Parameter  "+memberData);
            console.log("adding member", memberData);
            var parameter = JSON.stringify(memberData);
            $http.post("/writeData",parameter);
        };



    }]);
