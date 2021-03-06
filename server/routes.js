/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var tour = require('./api/tour/tour.controller');
var user = require('./api/user/user.controller');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/city', require('./api/city'));
  app.use('/api/tours', require('./api/tour'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  app.get('/api/tour/:id', function(req, res){
    tour.show(req, res);
  });

  app.post('/api/tour/:id', function(req, res){
    tour.addReview(req, res);
  });

  app.get('/api/user/:id', function(req, res){
    user.show(req, res);
  });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
