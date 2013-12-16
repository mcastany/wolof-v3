'use strict';

angular.module('wolofApp').directive('hgPieChart', ['$compile', function ($compile) {
  return {
    template: '<div style="margin: 0 auto">Highcharts not working</div>',
    restrict: 'E',
    replace: true,
    scope: {
      items: '=',
      title: '@',
      name: '@',
      id: '@'
    },
    link: function postLink(scope, element) {
      $compile(element)(scope);
      var chart = new Highcharts.Chart({
        chart: {
          renderTo: scope.id,
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          spacingBottom: 0,
          spacingTop: 0,
          spacingLeft: 0,
          spacingRight: 0,
          marginLeft: 0,
          marginTop: 0,
          marginBottom: 0,
          marginRight: 0
        },
        title: { text: scope.title || 'Title' },
        tooltip: { formatter: function() { return '<b>'+ this.point.name +'</b>: '+ this.y +' %'; } },
        series: [{ type: 'pie', name: scope.name || 'Stories', data: scope.items }]
      });

      scope.$watch('items', function (newValue) {
        chart.series[0].setData(newValue, true);
      }, true);
    }
  };
}]);
