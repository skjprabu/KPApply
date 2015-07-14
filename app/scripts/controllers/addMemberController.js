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
        var ctrl = this;
        ctrl.status = {"success" : false, "failure" : false};

        // in controller
        
        $scope.reset = function(form) {
            form.$setPristine();
            form.$setUntouched();
        };

        $scope.addMember = function (memberData, form){

            console.log("adding member", $scope.memberData );
            console.log("adding member", memberData);
            var parameter = JSON.stringify(memberData);
            logger.info("Parameter  "+parameter);
            $http.post("/writeData",parameter).
                success(function(data, status, headers, config){
                    $scope.memberData = {'gender': 'Male', 'previous_customer': 'Yes'};
                    $scope.reset(form);
                    ctrl.status.success = true;
                    ctrl.status.failure = false;
                }).error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    ctrl.status.success = false;
                    ctrl.status.failure = true;
                });
        };

    }]);
