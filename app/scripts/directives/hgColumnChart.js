'use strict';

angular.module('wolofApp').directive('hgColumnChart', ['$compile', function ($compile) {
  return {
    template: '<div style="margin: 0 auto">Highcharts not working</div>',
    restrict: 'E',
    replace: true,
    scope: {
      items: '=',
      title: '@',
      name: '@',
      id: '@',
      yAxis : '@'
    },
    link: function postLink(scope, element) {
      $compile(element)(scope);
      var chart = new Highcharts.Chart({
        chart: { renderTo: scope.id, type: 'column' },
        title: { text: scope.title || 'Title' },
        xAxis: { categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] },
        yAxis: { min: 0, title: { text: scope.yAxis || 'yAxis' } },
        plotOptions: { column: { pointPadding: 0.2, borderWidth: 0 } },
        series: scope.items
      });
      scope.$watch('items', function (newValue) {
        chart.series[0].setData(newValue, true);
      }, true);
    }
  };
}]);
