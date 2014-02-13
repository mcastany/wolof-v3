'use strict';

angular.module('wolofApp').factory('socketDeliveryMap', ['socket', function (socket) {
   var connect = function (project){
      socket.emit('delivery:init', project);
   };

   var getInitialData = function (delegate){
      if (delegate && typeof(delegate) === "function") {  
          socket.on('delivery:initialized:iteration', delegate);
       }
   };

   var addIteration = function(projectId, number, from, to){
      var data = {
        number : number,
        project : projectId,
        from: from,
        to: to
      };
      socket.emit('delivery:create:iteration', data);
   };

   var onIterationAdded = function(delegate){
       if (delegate && typeof(delegate) === "function") {  
          socket.on('delivery:created:iteration', delegate);
       }
   };

   var editIteration = function(projectId, number, from, to){
      var data = {
        number : number,
        project : projectId,
        from: from,
        to: to
      };
      socket.emit('delivery:edit:iteration', data);
   };

   var onIterationEdited = function(delegate){
       if (delegate && typeof(delegate) === "function") {  
          socket.on('delivery:edited:iteration', delegate);
       }
   };

   var removeIteration = function(projectId, number){
      var data = {
        number : number,
        project : projectId
      };
      socket.emit('delivery:remove:iteration', data);
   };

   var onIterationRemoved = function(delegate){
       if (delegate && typeof(delegate) === "function") {  
          socket.on('delivery:removed:iteration', delegate);
       }
   };

   var addFeature = function(projectId, number, name, status, callback){
      var data = {
        project : projectId,
        number: number,
        name: name,
        status : status || "pending"
      };
      socket.emit('delivery:add:feature', data);
      if (callback && typeof(callback) === "function") {  
        callback({name: name, status: status});
      }
   };

   var onFeatureAdded = function(delegate){
       if (delegate && typeof(delegate) === "function") {  
          socket.on('delivery:added:feature', delegate);
       }
   };

   var editFeature = function(projectId, number, id, name, status){
      var data = {
        project : projectId,
        number: number,
        id: id,
        name: name,
        status: status
      };
      socket.emit('delivery:edit:feature', data);
      if (callback && typeof(callback) === "function") {  
        callback({name: name, status: status});
      }
   };

   var onFeatureEdited = function(delegate){
       if (delegate && typeof(delegate) === "function") {  
          socket.on('delivery:edited:feature', delegate);
       }
   };

   var removeFeature = function(projectId, number, id){
       var data = {
        project : projectId,
        number: number,
        id : id
      };
      socket.emit('delivery:remove:feature', data);
   };

   var onFeatureRemoved = function(delegate){
       if (delegate && typeof(delegate) === "function") {  
          socket.on('delivery:removed:feature', delegate);
       }
   };
   return {
      connect: connect,
      getInitialData: getInitialData,
      addIteration: addIteration,
      removeIteration: removeIteration,
      editIteration: editIteration,
      addFeature: addFeature,
      removeFeature: removeFeature,
      editFeature: editFeature,
      
      onIterationCreated: onIterationAdded,
      onIterationRemoved: onIterationRemoved,
      onIterationEdited: onIterationEdited,
      onFeatureCreated: onFeatureAdded,
      onFeatureRemoved: onFeatureRemoved,
      onFeatureEdited: onFeatureEdited
   };
  }]);
