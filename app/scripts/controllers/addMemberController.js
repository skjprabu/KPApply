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



        $scope.addMember = function (memberData){

            console.log("adding member", $scope.memberData );
            console.log("adding member", memberData);
            var parameter = JSON.stringify(memberData);
            logger.info("Parameter  "+parameter);
            $http.post("/writeData",parameter).
                success(function(data, status, headers, config){
                    $scope.memberData = {'gender': 'Male', 'previous_customer': 'Yes'};
                });
        };



    }]);
