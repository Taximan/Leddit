export default function (app) {
  app.directive('pwMatch', function() {
    return {
      require: 'ngModel',
      scope: {
        otherInputValue: '=pwMatch'
      },
      link: function(scope, elem, attrs, ngModel) {
        ngModel.$validators.pwMatch = modelValue => {
          return scope.otherInputValue.$modelValue === modelValue;
        };
        scope.$watch("otherInputValue", function() {
          ngModel.$validate();
        });  
      } 
    };
  });
}