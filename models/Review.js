const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Pleas add a course title for the review"],
    maxlength: 100
  },
  text: {
    type: String,
    required: [true, "Please add some text"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Please add a rating between 1 and 10"]
  },

  createdAt: {
    type: Date,
    default: Date.now()
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  }
});

// Only one review per bootcamp
ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

// Static method to get the avg rating and save
ReviewSchema.statics.getAverageRating = async function(bootcampId) {
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId }
    },
    {
      $group: {
        _id: "$bootcamp",
        averageRating: { $avg: "$rating" }
      }
    }
  ]);

  try {
    await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
      averageRating: Math.ceil(obj[0].averageRating)
    });
  } catch (error) {
    console.log(error);
  }
};

// CALL getAverageRating AFTER SAVE
ReviewSchema.post("save", function() {
  this.constructor.getAverageRating(this.bootcamp);
});
// CALL getAverageRating BEFORE REMOVE
ReviewSchema.pre("remove", function() {});

module.exports = mongoose.model("Review", ReviewSchema);
