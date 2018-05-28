'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var BookSchema = new Schema({
//   title: String,
//   published: {
//     type: Date,
//     default: Date.now
//   },
//   keywords: Array,
//   author: {
//     type: Schema.ObjectId,
//     ref: 'User'
//   },
//   //Embeded sub-document
//   detail: {
//     modelNumber: Number,
//     hardCover: Boolean,
//     reviews: Number,
//     rank: Number
//   }
// });

var BookSchema = new Schema({
  title: String,
  author: String,
  category: String
});
module.exports = mongoose.model('Book', BookSchema);