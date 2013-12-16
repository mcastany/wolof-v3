'use strict';

angular.module('wolofApp').factory('storyFactory', function () {
  var stories = [
      { name: 'As a user, I want to .....', points: 2, tags: ['prio1'], iteration : 1, projectId : 1, id : 1, status: 'completed' },
      { name: 'As a user, I want to .....', points: 4, tags: ['prio1'], iteration : 1, projectId : 1, id : 2, status: 'progress'  },
      { name: 'As a user, I want to .....', points: 0, tags: ['prio1'], iteration : 2, projectId : 1, id : 3, status: 'blocked'  },
      { name: 'As a user, I want to .....', points: 4, tags: ['prio1'], iteration : 3, projectId : 1, id : 4, status: 'pending'  }
    ];

  var getAllByProject = function (projectId) {
    var list = [];
    for (var i = stories.length - 1; i >= 0; i--) {
      if (stories[i].projectId === projectId ) {
        list.push(stories[i]);
      }
    }
    return list;
  };

  var getByProjectAndIteration = function (projectId, iterationNumber) {
    var list = [];
    for (var i = stories.length - 1; i >= 0; i--) {
      if (stories[i].projectId === projectId && stories[i].iteration === iterationNumber) {
        list.push(stories[i]);
      }
    }

    return list;
  };

  var addStory = function (projectId, iterationNumber, story, points, tags) {
    var list = getByProjectAndIteration(projectId, iterationNumber);
    var id = (list.last().id || -1) + 1;

    stories.push({
      id: id,
      name : story,
      points : points || 0,
      tags : tags || [],
      iteration : iterationNumber,
      projectId : projectId
    });
  };

  var removeStory = function (projectId, iterationNumber, storyId) {
    for (var i = stories.length - 1; i >= 0; i--) {
      if (stories[i].projectId === projectId && stories[i].iteration === iterationNumber && stories[i].id === storyId) {
        stories.splice(i, 1);
      }
    }
  };

  var updateStory = function (projectId, iterationNumber, storyId, story, points, tags) {
    for (var i = stories.length - 1; i >= 0; i--) {
	    if (stories[i].projectId === projectId && stories[i].iteration === iterationNumber && stories[i].id === storyId) {
	      stories[i].name = story;
	      stories[i].points = points || stories[i].points;
	      stories[i].tags = tags || stories[i].tags;
	    }
    }
  };

  return {
    getAllByProject : getAllByProject,
    getByProjectAndIteration: getByProjectAndIteration,
    addStory : addStory,
    removeStory : removeStory,
    updateStory : updateStory
  };
});
