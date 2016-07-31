var express = require('express');
var mongoose = require('mongoose');
var db = require('../models/db.js');
var SLM = mongoose.model('ShoppingListModel');
var router = express.Router();

/* GET /shoppingItems listing. */
router.get('/', function(req, res, next) {
  SLM.find(function (err, allitems) {
    if (err) return next(err);
    res.json(allitems);
  });
});

/* POST /shoppingItems */
router.post('/', function(req, res, next) {
  SLM.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /shoppingItems/id */
router.get('/:id', function(req, res, next) {
  SLM.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /shoppingItems/:id */
router.put('/:id', function(req, res, next) {
  SLM.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /shoppingItems/:id */
router.delete('/:id', function(req, res, next) {
  SLM.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
