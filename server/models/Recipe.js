const mongoose = require('mongoose');

// Embedded Ingredient Schema
const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: false // optional quantity
  }
}, { _id: false }); // no need for ID

const recipeSchema = new mongoose.Schema({
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  title: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    required: false
  },
  ingredients: [ingredientSchema],
  instructions: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);
