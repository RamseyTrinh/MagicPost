const mongoose = require("mongoose");
const fs = require("fs");
const validator = require("validator");

const transactionPointSchema = new mongoose.Schema({
  id: {
    String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  location: {
    type: String,
  },
  warehouseID: {
    type: String,
  },
});

movieSchema.post("save", function (doc, next) {
  const content = `A new movie document with name ${doc.name} has been created by ${doc.location}\n`;
  fs.writeFileSync("./Log/log.txt", content, { flag: "a" }, (err) => {
    console.log(err.message);
  });
  next();
});

movieSchema.pre(/^find/, function (next) {
  this.find({ releaseDate: { $lte: Date.now() } });
  this.startTime = Date.now();
  next();
});

movieSchema.post(/^find/, function (docs, next) {
  this.find({ releaseDate: { $lte: Date.now() } });
  this.endTime = Date.now();

  const content = `Query took ${
    this.endTime - this.startTime
  } milliseconds to fetch the documents.`;
  fs.writeFileSync("./Log/log.txt", content, { flag: "a" }, (err) => {
    console.log(err.message);
  });

  next();
});

const transactionPoint = mongoose.model(
  "transactionPoint",
  transactionPointSchema
);

module.exports = transactionPoint;
