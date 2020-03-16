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

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", { useNewUrlParser: true });

// db.Workout.create({ name: "Workout" })
//   .then(dbWorkout => {
//     console.log(dbWorkout);
//   })
//   .catch(({ message }) => {
//     console.log(message);
//   });


// Routes
// =============================================================
app.use(require("./routes/html-routes.js"));


app.get("/api/workouts", function(req, res) {
  db.Workout.find({}).then(function(dbWorkout) {
    res.json(dbWorkout);
  });
});

// app.put("/api/workouts/:id", function(req, res) {
//   db.Workout.updateOne({ _id: req.params.id }, { type: req.body.type }, { name: req.body.name }, { duration: req.body.duration }, { distance: req.body.distance },{ weight: req.body.weight }, { reps: req.body.reps }, { sets: req.body.sets })
//   .then(function(dbWorkout) {
//     res.json(dbWorkout);
//   });
// });

app.post("/api/workouts/:id", function(req, res) {
  db.Workout.updateOne({ _id: req.params.id }, { type: req.body.type }, { name: req.body.name }, { duration: req.body.duration }, { distance: req.body.distance }, 
    { weight: req.body.weight }, { reps: req.body.reps }, { sets: req.body.sets }).then(function(dbWorkout) {
    res.json(dbWorkout);
  });
});

app.put("/api/workouts/:id", ({ body, params }, res) => {
  console.log(body)
  db.Workout.updateOne({ _id: params.id }, { 
   $push: { exercises: { type: body.type,  
    name: body.name, 
    duration: body.duration, 
    distance: body.distance, 
    weight: body.weight,
    reps: body.reps,
    sets: body.sets}} })
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

// app.post("/api/workouts", function(req, res) {
//   db.Workout.updateOne({ _id: req.params.id }, { type: req.body.type }, { name: req.body.name }, { duration: req.body.duration }, { distance: req.body.distance }, { weight: req.body.weight }, { reps: req.body.reps }, { sets: req.body.sets }).then(function(dbWorkout) {
//     res.json(dbWorkout);
//   });
// });


app.get("/workouts", function(req, res) {
  db.Workout.find({}).then(function(dbWorkout) {
    res.json(dbWorkout);
  });
});

app.put("/workouts/:id", function(req, res) {
  db.Workout.updateOne({ _id: req.params.id }, { type: req.body.type }, { name: req.body.name }, { duration: req.body.duration }, { distance: req.body.distance }, 
    { weight: req.body.weight }, { reps: req.body.reps }, { sets: req.body.sets }).then(function(dbWorkout) {
    res.json(dbWorkout);
  });
});

// app.post("/api/workouts", function(req, res) {
//   console.log(req.body)
//   db.Workout.create({ _id: req.params.id }, { type: req.body.type }, { name: req.body.name }, { duration: req.body.duration }, { distance: req.body.distance }, { weight: req.body.weight }, { reps: req.body.reps }, { sets: req.body.sets })
//   .then(function(dbresult) {
//     res.json(dbresult);
//   });
// });



app.post("/api/workouts", ({ body }, res) => {
  console.log({body})
  db.Workout.create(body)

    // .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { _id: id } }, { new: true }))
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// app.get("/workouts", (req, res) => {
//   db.Workout.find({})
//     .then(dbNote => {
//       res.json(dbNote);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });



// app.get("/user", (req, res) => {
//   db.User.find({})
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });


// app.get("/stats", (req, res) => {
//   db.Workout.find({})
//     .populate("workouts")
//     .then(dbWorkout => {
//       res.json(dbWorkout);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.get("/api/workouts", function(req, res) {
//   db.Workout.find({}).then(function(dbresult) {
//     res.json(dbresult);
//   })
//   .catch(err => {
//     res.json(err);
//   });
// });

// app.get("/api/workouts/:id", function(req, res) {
//   // Find one Author with the id in req.params.id and return them to the user with res.json
//   db.Workout.findOne({_id: req.params.id}
 
//   ).then(function(dbresult) {
//     res.json(dbresult);
//   });
// });






// app.post("/api/workouts/:id", ({ body }, res) => {
//   console.log (body)
//   // db.Workout.update(body)
//   //   .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { _id: id } }, { new: true }))
//   //   .then(dbUser => {
//   //     res.json(dbUser);
//   //   })
//   //   .catch(err => {
//   //     res.json(err);
//   //   });
// });

// // app.post("/api/movie", function(req, res) {
// //   // Create an Author with the data available to us in req.body
// //   console.log(req.body);
// //   db.Movie.create(req.body).then(function(dbresult) {
// //     res.json(dbresult);
// //   });
// // });










app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
