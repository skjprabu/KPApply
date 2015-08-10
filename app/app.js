'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 *
 * Main module of the application.
 */
angular
    .module('kpapply', [
        'ngRoute', 'ngMessages', 'ngIdle', 'ui.bootstrap', 'extendLog'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/form', {
                templateUrl: 'views/form.html',
                controller: 'AddMemberController'
            })
            .when('/plans', {
                templateUrl: 'views/plans.html',
                controller: 'PlansController'
            })
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainController'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .config(['$httpProvider', function ($httpProvider) {
        //Http Interceptor to check auth failures for xhr requests
        $httpProvider.interceptors.push('authenticationHttpResponseInterceptor');
    }])
    .config(['KeepaliveProvider', 'IdleProvider', function (KeepaliveProvider, IdleProvider) {
        // ng-idle session timeout configuration
        IdleProvider.idle(5);
        IdleProvider.timeout(6);
        KeepaliveProvider.interval(10);
    }])
    .service('alertService', function () {
        var alertServiceMessage = {"messages": [{"type":"info", "message" : "If you are 65+ years of age and Medicare eligible, or are under age 65 and entitled to Medicare on the basis of Social Security disability, please go to kp.org/medicare or call 1-877-619-9261 to speak to a licensed sales specialist to find out about our Kaiser Permanente Medicare health plans."}]};
        return {
            getMessages: function () {
                return alertServiceMessage;
            },
            addMessage: function(message) {
                alertServiceMessage.messages.push(message);
            },
            resetMessage:function() {
                alertServiceMessage = {"messages": []};
            }
        };
    });;