const { ObjectId } = require('mongodb');
const { logger } = require('../../utils');
const { Booking } = require('../../models');

// BUSCAR CITA
function getAllBookings(filters) {
  return Booking.find(filters).populate('user', '-password -rol -__v');
}

// BUSCAR CITA POR STATUS
async function getBookingByStatus(status) {
  try {
    const booking = await Booking.find({ status }).populate('user', '-password -rol -__v');
    return booking;
  } catch (error) {
    logger.error(`Error find booking with status ${status}: ${error}`);
    throw error;
  }
}

// BUSCAR CITA SEGÚN ID DEL USUARIO
async function getBookingById(id) {
  try {
    const booking = await Booking.findById(id).populate('user', '-password -rol -__v');
    return booking;
  } catch (error) {
    logger.error(`Error find booking with id ${id}: ${error}`);
    throw error;
  }
}

// CREAR CITA
async function createBooking(bookingData, file) {
  const pendingBooking = {
    ...bookingData,
    image: file.originalname,
    status: 'pending',
    date: 'pending',
    price: 'pending',
  };
  const createdBooking = await Booking.create(pendingBooking);
  logger.info(`Created booking with id: ${createdBooking.id} `);
  return createdBooking;
}

// ACEPTAR CITA
async function acceptBooking(id, date, price) {
  const updatedBooking = await Booking.findByIdAndUpdate(
    id,
    {
      date,
      price,
      status: 'accepted',
    },
    { new: true },
  );

  if (!updatedBooking) {
    const error = new Error('Booking not found');
    error.statusCode = 404;
    throw error;
  }

  return updatedBooking;
}

// CANCELAR CITA
async function cancelBooking(id) {
  const cancelledBooking = await Booking.findByIdAndUpdate(
    id,
    {
      status: 'cancelled',
    },
    { new: true },
  );

  if (!cancelledBooking) {
    const error = new Error('Booking not found');
    error.statusCode = 404;
    throw error;
  }

  return cancelledBooking;
}

// CAMABIAR FECHA
async function changeDateBooking(id, date) {
  const updatedBooking = await Booking.findByIdAndUpdate(
    id,
    {
      date,
    },
    { new: true },
  );

  if (!updatedBooking) {
    const error = new Error('Booking not found');
    error.statusCode = 404;
    throw error;
  }

  return updatedBooking;
}

// BORRAR CITA
async function deleteBooking(id) {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(new ObjectId(id));
    logger.info(`Deleted user with id: ${id}`);
    return deletedBooking;
  } catch (error) {
    logger.error(`Error deleting user with id ${id}: ${error}`);
    throw error;
  }
}

module.exports = {
  getAllBookings,
  getBookingByStatus,
  getBookingById,
  createBooking,
  acceptBooking,
  cancelBooking,
  changeDateBooking,
  deleteBooking,
};
