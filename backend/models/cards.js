const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^((http|https):\/\/)(www\.)?([\w\W\d]{1,})(\.)([a-zA-Z]{1,10})([\w\W\d]{1,})?$/.test(v);
      },
      message: 'URL введен некорректно.',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
  }],
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
