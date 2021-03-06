// Array.find polyfill
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined.');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this),
        length = list.length >>> 0,
        thisArg = arguments[1],
        value;

    for (var ii = 0; ii < length; ii++) {
      value = list[ii];
      if (predicate.call(thisArg, value, ii, list)) {
        return value;
      }
    }
    return undefined
  };
}

var posts = 
      [
        {
          id: 1,
          title: "foo",
          body: "fooooffoooof __bold__ _italics_ stuff",
          date: new Date(2014,5,4,6,0,0),
          author: 1
        }, { 
          id: 2, 
          title: "bar", 
          body: "barrabbarrab",
          date: new Date(2014,9,15,8,10,0),
          author: 1 
        }
      ],

    authors = 
      [
        {
          id: 1,
          name: "Bob",
          posts: [1,2]
        }
      ];

module.exports = function(app) {
  var express = require('express');
  var postsRouter = express.Router();

  postsRouter.get('/', function(req, res) {
    res.send({
      'posts': posts,
      "authors": authors
    });
  });

  postsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  postsRouter.get('/:id', function(req, res) {
    res.send({
      // `posts` is the var from :26
      'posts': posts.find(function(post) {
        // Returns the post where id is the sams as the params.id
        return post.id == req.params.id
      }),
      'authors': authors
    });
  });

  postsRouter.put('/:id', function(req, res) {
    res.send({
      'posts': {
        id: req.params.id
      }
    });
  });

  postsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/posts', postsRouter);
};
