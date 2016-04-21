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
  },

  spec: {

    os: {
      type: String,
      default: ''
    },

    type: { // 0 = mobile, 1 = tablet, 2 = desktop
      type: Number,
      default: 0
    },

    screen: {

      portrait: {
        type: String,
        default: ''
      },

      landscape: {
        type: String,
        default: ''
      },

      dpi: {
        type: Number,
        default: 0
      },

      dppx: {
        type: Number,
        default: 0
      }

    },

    description: {
      type: String,
      default: ''
    }

  }

}));
