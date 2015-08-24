/**
 * Created by: Sasideep
 * Last modified by : Sasideep
 * Used as a source to check if the entered input is 
 * Modifed source form stackoverflow.com/questions/31950621/angularjs-inputtype-number-validation-allow-only-numbers-to-be-entered
 */
angular.module('kpapply')
.directive('validNumber', function () {
    return {
        require: '?ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            // make sure we're connected to a model
            if (!ngModelCtrl) {
                return;
            }

            ngModelCtrl.$parsers.push(function (val) {
                // this is a test for whether it's undefined (from textbox)
                // or null when using type="number"
                if (val === undefined || val === null) {
                    val = '';
                }

                // here we try and clean it to make sure it's only numbers
                var clean = val.toString().replace(/[^0-9]+/g, '');

                // if a letter/etc got in there, set the model to the "cleaned" number value
                if (val !== clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }
                return clean;
            });

            // this is to test for "32" = SPACEBAR
            // and "101" = e (Chrome for some reason let's E go through in type="number"
            element.bind('keypress', function (e) {

                var code = e.keyCode || e.which;

                // Remove code === 101 part if you want 'e' to go through
                // code === 45 means '-'
                if (code === 101 || code === 32 || code === 45) {
                    e.preventDefault();
                }
            });
        }
    };
});

