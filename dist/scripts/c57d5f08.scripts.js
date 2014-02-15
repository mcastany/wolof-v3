"use strict";angular.module("wolofApp",["ngCookies","ngResource","ngSanitize","ui.router","ui.sortable","underscore","config"]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/"),a.state("home",{url:"/",templateUrl:"views/main.html",controller:"MainCtrl"}).state("project",{url:"/wolof","abstract":!0,templateUrl:"views/navigation.html",controller:"NavigationCtrl"}).state("create",{url:"/wolof/create",templateUrl:"views/create.html",controller:"CreateCtrl"}).state("project.summary",{url:"/:projectName",templateUrl:"views/summary.html",controller:"SummaryCtrl"}).state("project.backlog",{url:"/:projectName/backlog",templateUrl:"views/backlog.html",controller:"BacklogCtrl"}).state("project.backlogByiteration",{url:"/:projectName/backlog/:iterationNumber",templateUrl:"views/backlog.html",controller:"BacklogCtrl"}).state("project.deliverymap",{url:"/:projectName/deliverymap",templateUrl:"views/deliverymap.html",controller:"DeliverymapCtrl"}).state("project.deliverymapByiteration",{url:"/:projectName/deliverymap/:iterationNumber",templateUrl:"views/deliverymap.html",controller:"DeliverymapCtrl"}).state("project.sod",{url:"/:projectName/sod",templateUrl:"views/sod.html",controller:"SodCtrl"})}]),angular.module("config",[]).constant("socketEndpoint","http://wolof-v3.herokuapp.com/"),angular.module("wolofApp").controller("MainCtrl",["$scope","projectFactory",function(a,b){a.projects=[],b.getAll().then(function(b){a.projects=b})}]),angular.module("wolofApp").controller("BacklogCtrl",["$scope","$stateParams","$rootScope","projectFactory","storyFactory",function(a,b,c,d,e){a.route="backlog",a.stories=b.iterationNumber&&angular.isNumber(parseInt(b.iterationNumber))?e.getByProjectAndIteration(c.project.id,parseInt(b.iterationNumber)):e.getAllByProject(c.project.id)}]),angular.module("wolofApp").controller("DeliverymapCtrl",["$scope","$stateParams","projectFactory","$location","$rootScope","socketDeliveryMap",function(a,b,c,d,e,f){a.iterationNumber=b.iterationNumber||-1,f.getInitialData(function(b){a.iterations=b.iterations}),f.onIterationCreated(function(b){a.iterations.push(b)}),f.onIterationRemoved(function(b){for(var c=-1,d=a.iterations.length-1;d>=0;d--)a.iterations[d].number==b.number&&(c=d);c>-1&&a.iterations.splice(c,1)}),f.onIterationEdited(function(b){for(var c=a.iterations.length-1;c>=0;c--)a.iterations[c].number==b.number&&(a.iterations[c].from=b.from,a.iterations[c].to=b.to)}),f.onFeatureCreated(function(b){for(var c=-1,d=a.iterations.length-1;d>=0;d--)a.iterations[d].number==b.number&&(c=d);c>-1&&(a.iterations[c].features=b.features)}),f.onFeatureRemoved(function(b){for(var c=-1,d=a.iterations.length-1;d>=0;d--)a.iterations[d].number==b.number&&(c=d);c>-1&&(a.iterations[c].features=b.features)}),f.onFeatureEdited(function(b){for(var c=a.iterations.length-1;c>=0;c--)a.iterations[c].number==b.number&&(a.iterations[c].features=b.features)}),c.getByName(b.projectName).then(function(b){a.project=b,f.connect(b)}),a.addFeature=function(b,c){var d="pending";f.addFeature(a.project.id,b,c,d);for(var e=a.iterations.length-1;e>=0;e--)if(a.iterations[e].number==b){a.iterations[e].features.push({name:c,status:d});break}},a.removeFeature=function(b,c){f.removeFeature(a.project.id,b,c)},a.editFeature=function(b,c,d,e){f.editFeature(a.project.id,b,c,d,e)},a.addIteration=function(){var b=1;0!=a.iterations.length&&(b=a.iterations[a.iterations.length-1].number+1),f.addIteration(a.project.id,b,new Date,new Date)},a.removeIteration=function(b){f.removeIteration(a.project.id,b)},a.editIteration=function(b,c,d){f.editIteration(a.project.id,b,c,d)},a.enableEdit=function(b){if(!b.edit){for(var c=a.iterations.length-1;c>=0;c--)for(var d=a.iterations[c].features.length-1;d>=0;d--)a.iterations[c].features[d].edit=!1;b.edit=!0}},a.disableEdit=function(){for(var b=a.iterations.length-1;b>=0;b--)for(var c=a.iterations[b].features.length-1;c>=0;c--)a.iterations[b].features[c].edit=!1},a.expand=function(b){if(!b.expand){for(var c=a.iterations.length-1;c>=0;c--)for(var d=a.iterations[c].features.length-1;d>=0;d--)a.iterations[c].features[d].expand=!1;b.expand=!0}},a.navigateToBacklog=function(a,b){b||d.path("/wolof/:projectName/backlog/:iterationNumber".replace(":projectName",e.project.name).replace(":iterationNumber",a))}}]),angular.module("wolofApp").controller("SummaryCtrl",["$scope","$stateParams","projectFactory",function(a){a.route="summary",a.istories=[["Completed",10],["In Progress",8],["Pending",5],["Blocked",1]],a.pstories=[["Completed",100],["In Progress",4],["Pending",30],["Blocked",2]],a.barChartData=[{name:"Completed",data:[49.9,71.5,106.4,129.2,144,176,135.6,148.5,216.4,194.1,95.6,54.4]},{name:"In Progress",data:[83.6,78.8,98.5,93.4,106,84.5,105,104.3,91.2,83.5,106.6,92.3]},{name:"Blocked",data:[48.9,38.8,39.3,41.4,47,48.3,59,59.6,52.4,65.2,59.3,51.2]},{name:"Pending",data:[42.4,33.2,34.5,39.7,52.6,75.5,57.4,60.4,47.6,39.1,46.8,51.1]}]}]),angular.module("wolofApp").controller("SodCtrl",["$scope","$stateParams","$rootScope",function(a,b){b.route="sod"}]),angular.module("wolofApp").controller("NavigationCtrl",["$scope","$stateParams","$location","$rootScope","projectFactory",function(a,b,c,d,e){d.selected=!1,a.$on("$stateChangeSuccess",function(){var b=c.path().split("/");4===b.length?(console.log("Route: "+a.route),a.route=b[b.length-1].toLowerCase()):5===b.length?(console.log("Route: "+a.route),a.route=b[b.length-2].toLowerCase()):(console.log("Route: summary"),a.route="summary")}),b.projectName&&e.getByName(b.projectName).then(function(a){d.project=a})}]),angular.module("wolofApp").controller("CreateCtrl",["$scope","projectFactory","$location",function(a,b,c){a.addProject=function(){b.add(a.project).then(function(){c.path("/")})}}]),angular.module("wolofApp").factory("projectFactory",["$http","$q",function(a,b){var c=function(){var c=b.defer();return a.get("/api/projects").success(function(a){c.resolve(a)}),c.promise},d=function(c){var d=b.defer();return a.get("/api/projects/"+c).success(function(a){d.resolve(a)}),d.promise},e=function(c){var d=b.defer();return a.get("/api/projects/"+c).success(function(a){d.resolve(a)}),d.promise},f=function(c){var d=b.defer();return a.post("/api/projects",c).success(function(a){d.resolve(a)}).error(function(a,b){console.log(b),d.resolve(a)}),d.promise},g=function(c){var d=b.defer();return a.delete("/api/projects/"+c.id).success(function(a){d.resolve(a)}).error(function(a,b){console.log(b),d.resolve(a)}),d.promise};return{getAll:c,get:d,getByName:e,add:f,remove:g}}]),angular.module("wolofApp").factory("storyFactory",function(){var a=[{name:"As a user, I want to .....",points:2,tags:["prio1"],iteration:1,projectId:1,id:1,status:"completed"},{name:"As a user, I want to .....",points:4,tags:["prio1"],iteration:1,projectId:1,id:2,status:"progress"},{name:"As a user, I want to .....",points:0,tags:["prio1"],iteration:2,projectId:1,id:3,status:"blocked"},{name:"As a user, I want to .....",points:4,tags:["prio1"],iteration:3,projectId:1,id:4,status:"pending"}],b=function(b){for(var c=[],d=a.length-1;d>=0;d--)a[d].projectId===b&&c.push(a[d]);return c},c=function(b,c){for(var d=[],e=a.length-1;e>=0;e--)a[e].projectId===b&&a[e].iteration===c&&d.push(a[e]);return d},d=function(b,d,e,f,g){var h=c(b,d),i=(h.last().id||-1)+1;a.push({id:i,name:e,points:f||0,tags:g||[],iteration:d,projectId:b})},e=function(b,c,d){for(var e=a.length-1;e>=0;e--)a[e].projectId===b&&a[e].iteration===c&&a[e].id===d&&a.splice(e,1)},f=function(b,c,d,e,f,g){for(var h=a.length-1;h>=0;h--)a[h].projectId===b&&a[h].iteration===c&&a[h].id===d&&(a[h].name=e,a[h].points=f||a[h].points,a[h].tags=g||a[h].tags)};return{getAllByProject:b,getByProjectAndIteration:c,addStory:d,removeStory:e,updateStory:f}}),angular.module("wolofApp").factory("iterationFactory",["$http","$q","$rootScope",function(a,b){var c=function(c){var d=b.defer();return a.get("/api/project/"+c+"/iteration").success(function(a){d.resolve(a)}),d.promise},d=function(c,d){var e=b.defer();return a.get("/api/project/"+c+"/iteration/"+d).success(function(a){e.resolve(a)}),e.promise},e=function(c,d,e){var f=b.defer(),g={from:d,to:e,note:""};return a.post("/api/project/"+c+"/iteration",g).success(function(a){f.resolve(a)}).error(function(a){console.log(a)}),f.promise},f=function(c,d,e,f){var g=b.defer(),h={name:e,status:f||"pending"};return a.post("/api/project/"+c+"/iteration/"+d+"/feature",h).success(function(a){g.resolve(a)}).error(function(a){console.log(a)}),g.promise},g=function(c,d){var e=b.defer();return a.delete("/api/project/"+c+"/iteration/"+d.id).success(function(a){e.resolve(a)}).error(function(a,b){console.log(b),e.resolve(a)}),e.promise},h=function(c,d,e){var f=b.defer();return a.delete("/api/project/"+c+"/iteration/"+d+"/feature/"+e.id).success(function(a){f.resolve(a)}).error(function(a,b){console.log(b),f.resolve(a)}),f.promise};return{getAll:c,get:d,addIteration:e,addFeature:f,removeIteration:g,removeFeature:h}}]),angular.module("wolofApp").factory("socket",["$rootScope","socketEndpoint",function(a,b){var c=io.connect(b);return{on:function(b,d){c.on(b,function(){var b=arguments;a.$apply(function(){d.apply(c,b)})})},emit:function(b,d,e){c.emit(b,d,function(){var b=arguments;a.$apply(function(){e&&e.apply(c,b)})})}}}]),angular.module("wolofApp").factory("socketDeliveryMap",["socket",function(a){var b=function(b){a.emit("delivery:init",b)},c=function(b){b&&"function"==typeof b&&a.on("delivery:initialized:iteration",b)},d=function(b,c,d,e){var f={number:c,project:b,from:d,to:e};a.emit("delivery:create:iteration",f)},e=function(b){b&&"function"==typeof b&&a.on("delivery:created:iteration",b)},f=function(b,c,d,e){var f={number:c,project:b,from:d,to:e};a.emit("delivery:edit:iteration",f)},g=function(b){b&&"function"==typeof b&&a.on("delivery:edited:iteration",b)},h=function(b,c){var d={number:c,project:b};a.emit("delivery:remove:iteration",d)},i=function(b){b&&"function"==typeof b&&a.on("delivery:removed:iteration",b)},j=function(b,c,d,e,f){var g={project:b,number:c,name:d,status:e||"pending"};a.emit("delivery:add:feature",g),f&&"function"==typeof f&&f({name:d,status:e})},k=function(b){b&&"function"==typeof b&&a.on("delivery:added:feature",b)},l=function(b,c,d,e,f){var g={project:b,number:c,id:d,name:e,status:f};a.emit("delivery:edit:feature",g),callback&&"function"==typeof callback&&callback({name:e,status:f})},m=function(b){b&&"function"==typeof b&&a.on("delivery:edited:feature",b)},n=function(b,c,d){var e={project:b,number:c,id:d};a.emit("delivery:remove:feature",e)},o=function(b){b&&"function"==typeof b&&a.on("delivery:removed:feature",b)};return{connect:b,getInitialData:c,addIteration:d,removeIteration:h,editIteration:f,addFeature:j,removeFeature:n,editFeature:l,onIterationCreated:e,onIterationRemoved:i,onIterationEdited:g,onFeatureCreated:k,onFeatureRemoved:o,onFeatureEdited:m}}]),angular.module("wolofApp").directive("hgPieChart",["$compile",function(a){return{template:'<div style="margin: 0 auto">Highcharts not working</div>',restrict:"E",replace:!0,scope:{items:"=",title:"@",name:"@",id:"@"},link:function(b,c){a(c)(b);var d=new Highcharts.Chart({chart:{renderTo:b.id,plotBackgroundColor:null,plotBorderWidth:null,plotShadow:!1,spacingBottom:0,spacingTop:0,spacingLeft:0,spacingRight:0,marginLeft:0,marginTop:0,marginBottom:0,marginRight:0},title:{text:b.title||"Title"},tooltip:{formatter:function(){return"<b>"+this.point.name+"</b>: "+this.y+" %"}},series:[{type:"pie",name:b.name||"Stories",data:b.items}]});b.$watch("items",function(a){d.series[0].setData(a,!0)},!0)}}}]),angular.module("wolofApp").directive("hgColumnChart",["$compile",function(a){return{template:'<div style="margin: 0 auto">Highcharts not working</div>',restrict:"E",replace:!0,scope:{items:"=",title:"@",name:"@",id:"@",yAxis:"@"},link:function(b,c){a(c)(b);var d=new Highcharts.Chart({chart:{renderTo:b.id,type:"column"},title:{text:b.title||"Title"},xAxis:{categories:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},yAxis:{min:0,title:{text:b.yAxis||"yAxis"}},plotOptions:{column:{pointPadding:.2,borderWidth:0}},series:b.items});b.$watch("items",function(a){d.series[0].setData(a,!0)},!0)}}}]);