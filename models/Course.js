const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Pleas add a course title"]
  },
  description: {
    type: String,
    required: [true, "Please add a description"]
  },
  weeks: {
    type: String,
    required: [true, "Please add number of weeks"]
  },
  tuition: {
    type: Number,
    required: [true, "Please add a tuition cost"]
  },
  minimumSkill: {
    type: String,
    required: [true, "Please add a tuition cost"],
    enum: ["beginner", "intermediate", "advanced"]
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true
  }
});

// STATIC METHOD TO GET AVG OF COURSE TUITIONS
CourseSchema.statics.getAverageCost = async function(bootcampId) {
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId }
    },
    {
      $group: {
        _id: "$bootcamp",
        averageCost: { $avg: "$tuition" }
      }
    }
  ]);

  try {
    await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10
    });
  } catch (error) {
    console.log(error);
  }
};

// CALL getAverageCost AFTER SAVE
CourseSchema.post("save", function() {
  this.constructor.getAverageCost(this.bootcamp);
});
// CALL getAverageCost BEFORE REMOVE
CourseSchema.pre("remove", function() {});

module.exports = mongoose.model("Course", CourseSchema);
