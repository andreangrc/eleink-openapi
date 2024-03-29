const { Schema, model, Types } = require('mongoose');

const bookingSchema = new Schema({
  description: { type: String, required: true },
  bodyPlace: { type: String, required: true },
  size: { type: String, required: true },
  image: { type: String },
  date: { type: String, format: Date },
  status: { type: String },
  price: { type: String },
  user: { type: Types.ObjectId, ref: 'Users' },
});

module.exports = model('Booking', bookingSchema);
