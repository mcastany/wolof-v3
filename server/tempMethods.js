
/*STORIES API*/
app.get('/api/projects/:projectId/story', function(req, res) {
  if (req.params.projectId) {
    Story.find({ projectId: req.params.projectId}, function (err, stories) {
      if (err) {
          return res.json(err);
      }

      res.json(stories);
    });
  }

  res.json([]);
});

app.post('/api/projects/:projectId/story', function(req, res) {
  if(!req.params.projectId){
    res.statusCode = 400;
    return res.send('Error 400: Project not found.');
  }

  if(!req.body.hasOwnProperty('name') ||
     !req.body.hasOwnProperty('points') ||
     !req.body.hasOwnProperty('tags') ||
     !req.body.hasOwnProperty('status') ||
     !req.body.hasOwnProperty('iteration')) {
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  }
  Counters.getNext('story', function(id){
    var story = {
        id : id,
        name : req.body.name,
        lowerCaseName : req.body.name.toLowerCase(),
        points : req.body.points,
        tags : req.body.tags,
        iteration : req.body.iteration,
        projectId : req.params.projectId,
        status : req.body.status,
    };


    Story.create(story, function(err, newStory){
      if (err) return res.json(err);

      res.json(story);
    });
  });
});

app.put('/api/project/:projectId/story/:storyId', function(req, res) {
  if ((req.params.projectId) && (req.params.storyId)) {
    if(!req.body.hasOwnProperty('name') && 
       !req.body.hasOwnProperty('points') &&
       !req.body.hasOwnProperty('tags') &&
       !req.body.hasOwnProperty('status') && 
       !req.body.hasOwnProperty('iteration')) {
       res.statusCode = 400;
       return res.send('Error 400: Update syntax incorrect.');
    }
    Story.findOne({ id: req.params.storyId, projectId : req.params.projectId }, function(err, story){
      if (err){
          res.json(err);
      }

      for(var property in req.body){
          if (req.body.hasOwnProperty(property)){
              if (property in story){
                  story[property] = req.body[property];
              }
          }
      }

      story.save(function(err, story){
          if (err){
              res.json(err);
          }
          res.json(story);
      });
    });
  }
  res.json(null);
});

app.delete('/api/project/:projectId/story/:storyId', function(req, res) {
  if ((req.params.projectId) && (req.params.storyId)) {
     Story.findOneAndRemove({ id: req.params.storyId, projectId: req.params.projectId}, function(err, story){
          if(err){
              res.send(err);
          }

          res.send(true);
      });
  }

  res.json(false);
});
/*END STORIES API*/

/*ITERATION API*/
app.get('/api/project/:projectId/iteration', function(req, res) {
  if (req.params.projectId){
   Iteration.find({ projectId: req.params.projectId}, function (err, iterations) {
      if (err) {
          return res.json(err);
      }

      res.json(iterations);
    });
  }

  res.json([]);
});

app.post('/api/project/:projectId/iteration', function(req, res) {
  if(!req.params.projectId){
    res.statusCode = 400;
    return res.send('Error 400: Project not found.');
  }

  Counters.getNext('iteration', function(id){
    var iteration = {
      number: id,
      projectId : req.params.projectId,
      from : from || new Date(),
      to : to || new Date().setDate(from.getDate() + 5),
      note : req.body.note || '',
      features: []
    };

    Iteration.create(iteration, function(err, newIteration){
      if (err) return res.json(err);

      res.json(newIteration);
    });
  });
});

app.put('/api/project/:projectId/iteration/:number', function(req, res) {
  if ((req.params.projectId) && (req.params.number)) {
    if( !req.body.hasOwnProperty('from') &&
        !req.body.hasOwnProperty('to') ) {
       res.statusCode = 400;
       return res.send('Error 400: Update syntax incorrect.');
    }
     
    Iteration.findOne({ number: req.params.number, projectId : req.params.projectId }, function(err, iteration){
      if (err){
          res.json(err);
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
              res.json(err);
          }
          res.json(iteration);
      });
    });
  }
});

app.delete('/api/project/:projectId/iteration/:number', function(req, res) {
  if ((req.params.projectId) && (req.params.number)) {
    Iteration.findOneAndRemove({ number: req.params.number, projectId: req.params.projectId}, function(err, iteration){
      if(err){
          res.send(err);
      }

      res.send(true);
    });
  }

  res.json(false);
});
/*END ITERATION API*/

app.post('/api/project/:projectId/iteration/:number/feature', function(req, res) {
  if(!req.params.projectId && !req.params.number){
    res.statusCode = 400;
    return res.send('Error 400: Project or Iteartion not found.');
  }

  if( !req.body.hasOwnProperty('name') ||
      !req.body.hasOwnProperty('status')){
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  }

  Iteration.findOne({ number: req.params.number, projectId : req.params.projectId }, function(err, iteration){
      if (err){
          res.json(err);
      }

      iteration.features.push({
        name: req.body.name,
        status: req.body.status
      })

      iteration.save(function(err, iteration){
          if (err){
              res.json(err);
          }
          res.json(iteration);
      });
  });
});

app.delete('/api/project/:projectId/iteration/:number/feature/:featureName', function(req, res) {
  if(!req.params.projectId && !req.params.number && !req.params.featureId){
    res.statusCode = 400;
    return res.send('Error 400: Project or Iteartion or Feature not found.');
  }


  Iteration.findOne({ number: req.params.number, projectId : req.params.projectId }, function(err, iteration){
      if (err){
          res.json(err);
      }
      
      var position = -1;

      for (var j = iteration.features.length - 1; j >= 0; j--) {
        if (iteration.features[j].name == req.params.featureName){
          position = j;
        }
      }

      if (position > -1){
        iteration.features.splice(subposition, 1);
        iteration.save(function(err, iteration){
          if (err){
              res.json(err);
          }
          res.json(iteration);
        });
      }
      else 
      {
        res.json(iteration);
      }
  });
});
