require('dotenv').config()
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
var path = require("path");
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// Routes
// =============================================================
app.use(require("./routes/html-routes.js"));


app.get("/api/workouts", function (req, res) {
  db.Workout.find({}).then(function (dbWorkout) {
    res.json(dbWorkout);
  });
});

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .populate("workouts")
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});


app.post("/api/workouts", ({ body }, res) => {
  console.log({ body })
  db.Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});



app.put("/api/workouts/:id", ({ body, params }, res) => {
  console.log(body)
  db.Workout.updateOne({ _id: params.id }, {
    $push: {
      exercises: {
        type: body.type,
        name: body.name,
        duration: body.duration,
        distance: body.distance,
        weight: body.weight,
        reps: body.reps,
        sets: body.sets
      }
    }
  })
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});


app.get("/workouts", (req, res) => {
  db.Workout.find({})
    .populate("workouts")
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});


app.put("/workouts/:id", function (req, res) {
  db.Workout.updateOne({ _id: req.params.id }, { type: req.body.type }, { name: req.body.name }, { duration: req.body.duration }, { distance: req.body.distance },
    { weight: req.body.weight }, { reps: req.body.reps }, { sets: req.body.sets }).then(function (dbWorkout) {
      res.json(dbWorkout);
    });
});











app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
