const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    minlength: 3,
  },
  preco: {
    type: Number,
    required: true,
  },
});

const Produto = mongoose.model("Produto", schema);
module.exports = Produto;
