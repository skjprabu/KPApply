angular.module('kpapply')
	.directive('alertDirective',function(){
        return {
            restrict : "E",
            templateUrl : "../../views/templates/alert.html",
            controller : "AddMemberController",
            controllerAs : "ctrl"
        };
    });