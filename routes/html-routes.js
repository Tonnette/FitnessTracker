// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
// var isAuthenticated = require("../config/middleware/isAuthenticated");

const express = require('express'),
router = express.Router();
// mainController = require('./controllers/main.controller.js')


// Routes
// =============================================================


  // homepage
  router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  router.get("/exercise", function(req, res) {
    // If the user already has an account send them to the members page
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
  });

  router.get("/stats", function(req, res) {
    // If the user already has an account send them to the members page
    res.sendFile(path.join(__dirname, "../public/stats.html"));
  });

  // router.get("/workout", function(req, res) {
  //   // If the user already has an account send them to the members page
  //   res.sendFile(path.join(__dirname, "../public/stats.html"));
  // });

  module.exports = router;



