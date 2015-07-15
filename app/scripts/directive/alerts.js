angular.module('kpapply')
	.directive('alertDirective',function(){
        return {
            restrict : "E",
            templateUrl : "../../views/templates/alert.html",
            controller : "AddMemberController",
            controllerAs : "ctrl"
        };
    })
    .directive('alertMessageDirective', function(){
        return {
            restrict : "E",
            templateUrl : "../../views/templates/alertMessage.html",
            controller : "AddMemberController",
            controllerAs : "addMemberCtrl"
        };
    });