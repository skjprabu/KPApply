'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:AddMemberController
 * @description
 *
 * Add Member controller
 */
angular.module('kpapply')
    .controller('AddMemberController', ['$scope', '$log','$http','alertService', function ($scope, $log, $http, alertService) {
        $scope.memberData = {'gender': 'Male', 'previous_customer': 'Yes'};
        var logger = $log.getInstance('addMemberController');
        var ctrl = this;
        ctrl.status = {"success" : false, "failure" : false};
        ctrl.messages = alertService.getMessages();

        // in controller
        
        $scope.reset = function(form) {
            form.$setPristine();
            form.$setUntouched();
            alertService.resetMessage();
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
                    alertService.addMessage({"type":"success", "message" : "Successfully Added the member"});
                    alertService.addMessage({"type":"warn", "message" : "Added the same member"});
                    ctrl.messages = alertService.getMessages();
                    console.log(alertService.getMessages());
                }).error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    ctrl.status.success = false;
                    ctrl.status.failure = true;
                    alertService.addMessage({"type":"error", "message" : "Unable to save the data."});
                    ctrl.messages = alertService.getMessages();
                });
        };
        $scope.getAlertMessages = function() {
            return alertService.getMessages();
        }

    }]);
