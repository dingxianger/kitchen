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
  title: {
    type: String,
    required: true
  },
  ingredients: [ingredientSchema],
  instructions: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);
