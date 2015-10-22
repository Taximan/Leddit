import '../../css/src/test.css';

import angular from 'angular';


const app = angular.module('APP', []);

app.controller('test', function($scope) {
  $scope.msg = 'hi';
});