var Iteration = require('../models/iteration').model,
    Counters = require('../models/counters'),
    Feature = require('../models/feature').model,
    mongoose = require('mongoose');

var iterationHelper = (function(){
  var getIterations = function (projectId, callback) {
      Iteration.find({ projectId: projectId}).sort('number').exec(function (err, iterations) {
       if (err) {
          if (callback && typeof(callback) === "function") {  
            callback(err);
          };
        }
        if (callback && typeof(callback) === "function") {  
          callback(iterations);
        }
      });
  };

  var createIteration =  function(data, callback){
      var iteration = {
        number: data.number,
        projectId : data.projectId,
        from : data.from || new Date(),
        to : data.to || new Date().setDate(data.from.getDate() + 5),
        note : data.note || '',
        features: []
      };
      Iteration.create(iteration, function(err, newIteration){
        if (err) {
          if (callback && typeof(callback) === "function") {  
            callback(err);
          }
        }
        if (callback && typeof(callback) === "function") {  
          callback(newIteration);
        }
      });
  };

  var updateIteration = function(data, callback){
    Iteration.findOne({ number: data.number, projectId : data.projectId }, function(err, iteration){
      if (err){
          if (callback && typeof(callback) === "function") {  
            callback(err);
          }
      }

      for(var property in req.body){
          if (req.body.hasOwnProperty(property)){
              if (property in iteration){
                  iteration[property] = req.body[property];
              }
          }
      }

      iteration.save(function(err, iteration){
          if (err){
              if (callback && typeof(callback) === "function") {  
                callback(err);
              }
          }

         if (callback && typeof(callback) === "function") {  
            callback(iteration);
          }
      });
    });
  };

  var deleteIteration = function(projectId, number, callback){
    Iteration.findOneAndRemove({ number: number, projectId: projectId}, function(err, iteration){
      if (err) {
          if (callback && typeof(callback) === "function") {  
            callback(err);
          }
        }
        if (callback && typeof(callback) === "function") {  
          callback(true);
        }
    });
  };

  var addFeature = function(projectId, number, name, status, callback){
   Iteration.findOne({ number: number, projectId : projectId }, function(err, iteration){
        if (err){
          if (callback && typeof(callback) === "function") {  
            callback(err);
          }
        }
        console.log(iteration);
        if (!iteration.features){
          iteration.features = [];
        }
        iteration.features.push({
          id : new mongoose.Types.ObjectId,
          name: name,
          status: status
        })

        iteration.save(function(err, iteration){
            if (err){
              if (callback && typeof(callback) === "function") {  
                callback(err);
              }
            }
            if (callback && typeof(callback) === "function") {  
              callback(iteration);
            }
        });
    });
  };

  var editFeature = function(projectId, number, id, name, status, callback) {
    Iteration.findOne({ number: number, projectId : projectId }, function(err, iteration){
        if (err){
          if (callback && typeof(callback) === "function") {  
            callback(err);
          }
        }
        
        var position = -1;

        for (var j = iteration.features.length - 1; j >= 0; j--) {
          console.log("Id: " + id)
          console.log("iteration.features[j].id: " + iteration.features[j].id)
          if (iteration.features[j].id == id){
            iteration.features[j].name = name;
            iteration.features[j].status = status;
            console.log("Edited: " + iteration.features[j])
            break;
          }
        }

       iteration.save(function(err, iteration){
          if (err){
            if (callback && typeof(callback) === "function") {  
              callback(err);
            }
          }
          if (callback && typeof(callback) === "function") {  
            callback(iteration);
          }
        });
    });
  };

  var removeFeature = function(projectId, number, id, callback){
    Iteration.findOne({ number: number, projectId : projectId }, function(err, iteration){
        if (err){
          if (callback && typeof(callback) === "function") {  
            callback(err);
          }
        }
        
        var position = -1;
        if (iteration.features){
          for (var j = iteration.features.length - 1; j >= 0; j--) {
            if (iteration.features[j].id == id){
              position = j;
            }
          }

          if (position > -1){
            iteration.features.splice(position, 1);
            iteration.save(function(err, iteration){
              if (err){
                if (callback && typeof(callback) === "function") {  
                  callback(err);
                }
              }
              if (callback && typeof(callback) === "function") {  
                callback(iteration);
              }
            });
          }
        }
        else 
        {
          if (callback && typeof(callback) === "function") {  
            callback(iteration);
          }
        }
    });
  };

  return {
    iterations : getIterations,
    create: createIteration,
    update: updateIteration,
    delete: deleteIteration,
    addFeature: addFeature,
    editFeature: editFeature,
    removeFeature: removeFeature
  };
}());

module.exports = function (server) {
  var io = require('socket.io').listen(server);
  // assuming io is the Socket.IO server object
  io.configure(function () { 
    io.set("transports", ["xhr-polling"]); 
    io.set("polling duration", 10); 
  });
  
  io.sockets.on('connection', function(socket){
    var userCountDM = 0,
        userCountBG = 0,
        sockets = io.sockets;
    
    socket.on('delivery:init', function(project) {
        userCountDM++;
        socket.projectId = project.id;
        socket.room = project.id + '-' + project.name + '-dm';
        socket.join(socket.room);
        
        iterationHelper.iterations(project.id, function(iterations){
          socket.emit('delivery:initialized:iteration', { iterations : iterations } )
        });
        
        socket.broadcast.to(socket.room).emit('delivery:user:join', {
          count: userCountDM
        });
    }); 

    socket.on('delivery:create:iteration', function (data) {
      if (socket.room && socket.projectId) {
        data.projectId = socket.projectId;
        iterationHelper.create(data, function(newIteration){
          sockets.in(socket.room).emit('delivery:created:iteration', newIteration);  
        });
      }
    });

    socket.on('delivery:remove:iteration', function (number) {
     if (socket.room && socket.projectId) {
        var projectId  =  socket.projectId;
        iterationHelper.delete(projectId, number, function(status){
          if (status){
            sockets.in(socket.room).emit('delivery:removed:iteration', number);
          } 
        });
      } 
    });

    socket.on('delivery:edit:iteration', function (data) {
     if (socket.room && socket.projectId) {
        data.projectId  =  socket.projectId;
        iterationHelper.update(data, function(iteration){
          if (iteration){
            sockets.in(socket.room).emit('delivery:edited:iteration', iteration);
          } 
        });
      } 
    });

    socket.on('delivery:add:feature', function (data) {
      if (socket.room && socket.projectId) {
        iterationHelper.addFeature(socket.projectId, data.number, data.name, data.status, function(iteration){
          if (iteration){
            sockets.in(socket.room).emit('delivery:added:feature', iteration);
          } 
        });
      } 
    });

    socket.on('delivery:edit:feature', function (data) {
      if (socket.room && socket.projectId) {
        iterationHelper.editFeature(socket.projectId, data.number, data.id, data.name, data.status, function(iteration){
          if (iteration){
            sockets.in(socket.room).emit('delivery:edited:feature', iteration);
          } 
        });
      } 
    });

    socket.on('delivery:remove:feature', function (data) {
      if (socket.room && socket.projectId) {
        
        iterationHelper.removeFeature(socket.projectId, data.number, data.id, function(iteration){
          if (iteration){
            sockets.in(socket.room).emit('delivery:removed:feature', iteration);
          } 
        });
      } 
    });


    socket.on('backlog:init', function(project) {
        userCountBG++;
        socket.join(project + '-bg');

        socket.emit('delivery:init', { stories : [] } )

        socket.broadcast.to(project + '-bg').emit('delivery:user:join', {
          count: userCount
        });
    }); 

    //socket.broadcast.emit('delivery:user:left', {
    //  count:  users.removeUser()
    //});

    /*socket.on('disconnect', function () {
      var userCount = users.removeUser();
      socket.broadcast.emit('user:left', {
        count: userCount
      });
    });*/
  });
};