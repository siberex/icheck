/**
 * AngularJS directive for iCheck (https://github.com/fronteed/iCheck)
 *
 * https://github.com/ciel/icheck
 * https://github.com/fronteed/iCheck/issues/205
 * https://github.com/fronteed/iCheck/issues/62
 *
 * @author @ciel
 * @author Azri Jamil(@wajatimur)
 * @author Maxim Syabro (@syabro)
 */

(function () {
  /**
   * Create a new module for icheck so that it can be injected into an existing
   * angular program easily.
   */
  angular.module('ui.check', [])
    .directive('icheck', ['$timeout', '$parse', function ($timeout, $parse) {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function($scope, element, $attrs, ngModel) {
          return $timeout(function() {
            var value;
            value = $attrs['value'];

            $scope.$watch($attrs['ngModel'], function(newValue){
              $(element).iCheck('update');
            });

            return $(element).iCheck({
              checkboxClass: 'icheckbox_custom',
              radioClass: 'iradio_custom'

            }).on('ifChanged', function(event) {
              if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                $scope.$apply(function() {
                  return ngModel.$setViewValue(event.target.checked);
                });
              }
              if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                return $scope.$apply(function() {
                  return ngModel.$setViewValue(value);
                });
              }
            });
          });
        }
      };
    }]);
})();