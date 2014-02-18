var Project = require('../models/project').model,
	Counters = require('../models/counters');

exports.get = function(req, res) {
  Project.find({}, function(err, projects){
   if (err) {
        return res.json(err);
    }
    
    res.json(projects);
  });
};

exports.getById  = function(req, res) {
  Project.findOne({ id: req.params.id}, function (err, project) {
    if (err) {
        return res.json(err);
    }

    res.json(project);
  });
};

exports.getByName =  function(req, res) {
  Project.findOne({ lowerCaseName: req.params.name}, function (err, project) {
    if (err) {
        return res.json(err);
    }
    res.json(project);
  });
};

exports.post = function(req, res) {
  if(!req.body.hasOwnProperty('name') || 
    !req.body.hasOwnProperty('description') ||
    !req.body.hasOwnProperty('startDate') ||
    !req.body.hasOwnProperty('endDate')||
    !req.body.hasOwnProperty('iterations') ) {
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  }

  Counters.getNext('project', function(id) {
     var project = {
        id: id,
        name : req.body.name,
        lowerCaseName : req.body.name.toLowerCase(),
        friendlyName : req.body.description,
        iterations : req.body.iterations,
        startDate : new Date(req.body.start),
        endDate : new Date(req.body.end),
      };

      Project.create(project, function(err, project){
         if (err) return res.json(err);
         res.json(project);
      }); 
  });
};

exports.put = function(req, res) {
  if (req.params.projectId) {
    if(!req.body.hasOwnProperty('name') && 
       !req.body.hasOwnProperty('friendlyName') &&
       !req.body.hasOwnProperty('startDate') &&
       !req.body.hasOwnProperty('endDate')) {
       res.statusCode = 400;
       return res.send('Error 400: Update syntax incorrect.');
    }
    
    Project.findOne({ id: req.params.id }, function(err, project){
      if (err){
          res.json(err);
      }

      for(var property in req.body){
          if (req.body.hasOwnProperty(property)){
              if (property in project){
                  project[property] = req.body[property];
              }
          }
      }

      project.save(function(err, project){
          if (err){
              res.json(err);
          }
          res.json(project);
      });
    });
  }
  res.json(null);
};

exports.delete = function(req, res) {
   Project.findByIdAndRemove(req.params.id, function(err, ad){
        if(err){
            res.send(err);
        }

        res.send(true);
    });
};

