import { debounce } from '../utils';

export default function (app) {
  app.directive('isUnique', function($http) {
    return {
      require: 'ngModel',
      link: function(scope, elem, attrs, ngModel) {
        var resource = attrs.isUnique;
            
        const evHandler = debounce(e => {
          scope.$apply(() => { 
            var val = e.target.value;
            var target = resource.replace('???', val);
            if(val.length > 0) {
                $http.head(target)
                  .then(d => ngModel.$setValidity('ununique', false))
                  .catch(e => ngModel.$setValidity('ununique', true));
            } else {
              ngModel.$setValidity('ununique', false)
            }
          });
        }, 200);
        
        elem.on('keyup', evHandler);
      }
    };
  });
}