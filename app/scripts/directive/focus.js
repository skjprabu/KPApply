/**
 * Directive used to focus a text input 
 * usage : use 'focus-me' attribute for an input text. The input is focussed when focus-me is valued 'true'
 * source : stackoverflow.com/questions/14833326/how-to-set-focus-on-input-field
 */
angular.module('kpapply')
.directive('focusMe', function($timeout) {
  return {
    scope: { trigger: '@focusMe' },
    link: function(scope, element) {
      scope.$watch('trigger', function(value) {
        if(value === "true") { 
          $timeout(function() {
            element[0].focus(); 
          });
        }
      });
    }
  };
});