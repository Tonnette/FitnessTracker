
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({

    // _id: Schema.Types.ObjectId,

    day: {
        type: Date,
        default: Date.now
    },
    exercises:
        [
            {
                type: { type: String, trim:true, required:"enter an exercise type" },
                name: { type: String, trim:true, required:"enter an exercise name" },
                duration: { type: Number },
                distance: { type: Number },
                weight: { type: Number  },
                reps: { type: Number  },
                sets: { type: Number },
                          
                },
            

        ], 
                
       
    
});






const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
