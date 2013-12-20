"use strict";angular.module("wolofApp",["ngCookies","ngResource","ngSanitize","ngRoute","ui.sortable"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/wolof",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/wolof/:projectName",{templateUrl:"views/summary.html",controller:"SummaryCtrl"}).when("/wolof/:projectName/backlog",{templateUrl:"views/backlog.html",controller:"BacklogCtrl"}).when("/wolof/:projectName/backlog/:iterationNumber",{templateUrl:"views/backlog.html",controller:"BacklogCtrl"}).when("/wolof/:projectName/deliverymap",{templateUrl:"views/deliverymap.html",controller:"DeliverymapCtrl"}).when("/wolof/:projectName/deliverymap/:iterationNumber",{templateUrl:"views/deliverymap.html",controller:"DeliverymapCtrl"}).when("/wolof/:projectName/sod",{templateUrl:"views/sod.html",controller:"SodCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("wolofApp").controller("MainCtrl",function(){}),angular.module("wolofApp").controller("BacklogCtrl",["$scope","$routeParams","$rootScope","projectFactory","storyFactory",function(a,b,c,d,e){a.stories=b.iterationNumber&&angular.isNumber(parseInt(b.iterationNumber))?e.getByProjectAndIteration(c.project.id,parseInt(b.iterationNumber)):e.getAllByProject(c.project.id)}]),angular.module("wolofApp").controller("DeliverymapCtrl",["$scope","$routeParams","projectFactory","iterationFactory","$location","$rootScope",function(a,b,c,d,e,f){a.enableRemove=!1,a.iterationNumber=b.iterationNumber||-1,a.iterations=d.getAll(),a.navigateToBacklog=function(a){e.path("/wolof/:projectName/backlog/:iterationNumber".replace(":projectName",f.project.name).replace(":iterationNumber",a))},a.addIteration=function(a,b){d.addIteration(a,b)},a.addFeature=function(a){d.addFeature(a,"New Feature")},a.removeFeature=function(a,b){d.removeFeature(a,b)}}]),angular.module("wolofApp").factory("storyFactory",function(){var a=[{name:"As a user, I want to .....",points:2,tags:["prio1"],iteration:1,projectId:1,id:1,status:"completed"},{name:"As a user, I want to .....",points:4,tags:["prio1"],iteration:1,projectId:1,id:2,status:"progress"},{name:"As a user, I want to .....",points:0,tags:["prio1"],iteration:2,projectId:1,id:3,status:"blocked"},{name:"As a user, I want to .....",points:4,tags:["prio1"],iteration:3,projectId:1,id:4,status:"pending"}],b=function(b){for(var c=[],d=a.length-1;d>=0;d--)a[d].projectId===b&&c.push(a[d]);return c},c=function(b,c){for(var d=[],e=a.length-1;e>=0;e--)a[e].projectId===b&&a[e].iteration===c&&d.push(a[e]);return d},d=function(b,d,e,f,g){var h=c(b,d),i=(h.last().id||-1)+1;a.push({id:i,name:e,points:f||0,tags:g||[],iteration:d,projectId:b})},e=function(b,c,d){for(var e=a.length-1;e>=0;e--)a[e].projectId===b&&a[e].iteration===c&&a[e].id===d&&a.splice(e,1)},f=function(b,c,d,e,f,g){for(var h=a.length-1;h>=0;h--)a[h].projectId===b&&a[h].iteration===c&&a[h].id===d&&(a[h].name=e,a[h].points=f||a[h].points,a[h].tags=g||a[h].tags)};return{getAllByProject:b,getByProjectAndIteration:c,addStory:d,removeStory:e,updateStory:f}}),angular.module("wolofApp").controller("SummaryCtrl",["$scope","$routeParams","projectFactory",function(a){a.istories=[["Completed",10],["In Progress",8],["Pending",5],["Blocked",1]],a.pstories=[["Completed",100],["In Progress",4],["Pending",30],["Blocked",2]],a.barChartData=[{name:"Completed",data:[49.9,71.5,106.4,129.2,144,176,135.6,148.5,216.4,194.1,95.6,54.4]},{name:"In Progress",data:[83.6,78.8,98.5,93.4,106,84.5,105,104.3,91.2,83.5,106.6,92.3]},{name:"Blocked",data:[48.9,38.8,39.3,41.4,47,48.3,59,59.6,52.4,65.2,59.3,51.2]},{name:"Pending",data:[42.4,33.2,34.5,39.7,52.6,75.5,57.4,60.4,47.6,39.1,46.8,51.1]}]}]),angular.module("wolofApp").controller("SodCtrl",["$scope","$routeParams",function(){}]),angular.module("wolofApp").factory("projectFactory",function(){var a=[{id:1,name:"Grays",friendlyName:"Windows Azure Training Kit",iterations:10,startDate:new Date(2013,11,8),endDate:new Date(2013,12,10),team:[{name:"Marcos Castany"},{name:"Hernan Meydac"},{name:"Gabriel Iglesias"},{name:"Nicolas Bello"}]}],b=function(){return a},c=function(b){for(var c=a.length-1;c>=0;c--)if(a[c].id===b)return a[c];return null},d=function(b){for(var c=a.length-1;c>=0;c--)if(a[c].name.toLowerCase()===b.toLowerCase())return a[c];return null},e=function(b){a.push(b)},f=function(b){var c=a.indexOf(b);c>-1&&a.splice(c,1)};return{getAll:b,get:c,getByName:d,add:e,remove:f}}),angular.module("wolofApp").factory("iterationFactory",function(){var a=[{number:1,from:new Date(2013,11,4),to:new Date(2013,11,8),note:"1 Holiday",features:[{name:"feature-1",status:"completed"},{name:"feature-6",status:"completed"}]},{number:2,from:new Date(2013,11,11),to:new Date(2013,11,15),features:[{name:"feature-2",status:"completed"}]},{number:3,from:new Date(2013,11,18),to:new Date(2013,11,22),features:[{name:"feature-3",status:"progress"},{name:"feature-7",status:"blocked"},{name:"feature-9",status:"pending"}]},{number:4,from:new Date(2013,11,25),to:new Date(2013,11,11),features:[{name:"feature-4",status:"pending"}]},{number:5,from:new Date(2013,12,2),to:new Date(2013,12,7),features:[{name:"feature-5",status:"pending"},{name:"feature-8",status:"pending"},{name:"feature-9",status:"pending"}]}],b=function(){return a},c=function(b){for(var c=a.length-1;c>=0;c--)if(a[c].number===b)return a[c];return null},d=function(b,c){var d=a[a.length-1];a.push({number:d.number+1,from:b||new Date(d.from.getFullYear(),d.from.getMonth(),d.from.getDate()+7),to:c||new Date(d.to.getFullYear(),d.to.getMonth(),d.to.getDate()+7),features:[]})},e=function(a,b,d){var e=c(a);e.features.push({name:b,status:d||"pending"})},f=function(b){var c=a.indexOf(b);c>-1&&a.splice(c,1)},g=function(a,b){var d=c(a),e=d.features.indexOf(b);e>-1&&d.features.splice(e,1)};return{getAll:b,get:c,addIteration:d,addFeature:e,removeIteration:f,removeFeature:g}}),angular.module("wolofApp").directive("rightclick",["$parse",function(a){return function(b,c,d){var e=a(d.ngRightClick);c.bind("contextmenu",function(a){b.$apply(function(){a.preventDefault(),e(b,{$event:a})})})}}]),angular.module("wolofApp").directive("ngEnter",function(){return function(a,b,c){b.bind("keydown keypress",function(b){13===b.which&&(a.$apply(function(){a.$eval(c.ngEnter)}),b.preventDefault())})}}),angular.module("wolofApp").controller("NavigationCtrl",["$scope","$routeParams","$location","$rootScope","projectFactory",function(a,b,c,d,e){d.selected=!1,a.$on("$routeChangeSuccess",function(){var f=c.path().split("/");a.route=4===f.length?f[f.length-1].toLowerCase():5===f.length?f[f.length-2].toLowerCase():"summary",d.project=e.getByName(b.projectName),d.selected=b.projectName?!0:!1}),a.selectProject=function(){d.selected=!0}}]),angular.module("wolofApp").directive("hgPieChart",["$compile",function(a){return{template:'<div style="margin: 0 auto">Highcharts not working</div>',restrict:"E",replace:!0,scope:{items:"=",title:"@",name:"@",id:"@"},link:function(b,c){a(c)(b);var d=new Highcharts.Chart({chart:{renderTo:b.id,plotBackgroundColor:null,plotBorderWidth:null,plotShadow:!1,spacingBottom:0,spacingTop:0,spacingLeft:0,spacingRight:0,marginLeft:0,marginTop:0,marginBottom:0,marginRight:0},title:{text:b.title||"Title"},tooltip:{formatter:function(){return"<b>"+this.point.name+"</b>: "+this.y+" %"}},series:[{type:"pie",name:b.name||"Stories",data:b.items}]});b.$watch("items",function(a){d.series[0].setData(a,!0)},!0)}}}]),angular.module("wolofApp").directive("hgColumnChart",["$compile",function(a){return{template:'<div style="margin: 0 auto">Highcharts not working</div>',restrict:"E",replace:!0,scope:{items:"=",title:"@",name:"@",id:"@",yAxis:"@"},link:function(b,c){a(c)(b);var d=new Highcharts.Chart({chart:{renderTo:b.id,type:"column"},title:{text:b.title||"Title"},xAxis:{categories:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},yAxis:{min:0,title:{text:b.yAxis||"yAxis"}},plotOptions:{column:{pointPadding:.2,borderWidth:0}},series:b.items});b.$watch("items",function(a){d.series[0].setData(a,!0)},!0)}}}]),angular.module("wolofApp").directive("wEditable",function(){return{template:'<div ng-dblclick="edit = true"><div class="closearea" ng-show="!edit"><div class="close-border avoid-selection" ng-click="removeHandler()">X</div></div><span ng-hide="edit">{{property}}</span><input ng-show="edit" type="text" ng-model="property" ng-enter="edit = false" /><a ng-show="edit"  ng-click="edit = false"><i class="fa fa-check"></i></a></div>',restrict:"A",replace:!0,scope:{property:"=",edit:"@",removeHandler:"&"},link:function(a,b){a.$watch("edit",function(){a.edit&&(b.find("input")[0].select(),b.find("input")[0].focus())})}}});