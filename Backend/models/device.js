'use strict';

/**
 * ABOUT MODEL device
 * representing a device in the database
 */

/**
 * dependencies
 * -----------------------------------------------------------------------------
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * model
 * -----------------------------------------------------------------------------
 */
module.exports = mongoose.model('Device', new Schema({

  _id: {
    type: String,
    default: ''
  },

  model: {
    type: String,
    default: ''
  },

  checkedOut: {
    type: Boolean,
    default: false
  },

  checkedOutBy: {
    type: String,
    default: ''
  }

}));
