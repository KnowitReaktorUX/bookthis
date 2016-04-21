'use strict';

/**
 * ABOUT ROUTE /devices
 * Routes mapping to device model
 */

/**
 * dependencies
 * -----------------------------------------------------------------------------
 */
const mongoose = require('mongoose');
const Device = require('../models/device.js');

/**
 * configuration
 * -----------------------------------------------------------------------------
 */
const dbConfig = require('../dbconfig.json');
const dbUser = dbConfig.user;
const dbPassword = dbConfig.password;

mongoose.connect(
  `mongodb://${dbUser}:${dbPassword}@ds060478.mlab.com:60478/bookthis`);

/**
 * helpers
 * -----------------------------------------------------------------------------
 */
const errorMessages = [
  'device need body parameter id to be created.',
  'device not found in database.',
  'route need body parameter checkedOutBy.'
];

const errorHandler = (res, messageId, customMessage) => {
  let message;

  if (messageId) {
    message = errorMessages[messageId];
  } else {
    message = customMessage;
  }

  res.json({
    status: 'error',
    message: message
  });
};

const successHandler = (res, data) => {
  res.json({
    status: 'success',
    data: data
  });
};

/**
 * route handlers
 * -----------------------------------------------------------------------------
 */
module.exports = {

  /**
   * POST /devices
   * create a new device
   * id (req)
   */
  createDevice: (req, res) => {
    if (!req.body.id) {
      errorHandler(res, 0);
      return;
    }

    const device = new Device();

    device._id = req.body.id;

    device.save((err) => {
      if (err) {
        res.send(err);
        return;
      }

      Device.findById(req.body.id, (err, device) => {
        if (err) {
          res.send(err);
          return;
        }

        successHandler(res, device);
      });
    });
  },

  /**
   * GET /devices
   * get a list of all devices
   */
  getDevices: (req, res) => {
    Device.find((err, devices) => {
      if (err) {
        res.send(err);
      }

      successHandler(res, devices);
    });
  },

  /**
   * GET /devices/:id
   * get information about device
   * id (req)
   */
  getDevice: (req, res) => {
    Device.findById(req.params.id, (err, device) => {
      if (err) {
        res.send(err);
        return;
      }

      if (!device) {
        errorHandler(res, 1);
        return;
      }

      successHandler(res, device);
    });
  },

  /**
   * PUT /devices/:id
   * updating information about device
   * id (req), model
   */
  updateDevice: (req, res) => {
    Device.findById(req.params.id, (err, device) => {
      if (err) {
        res.send(err);
        return;
      }

      if (!device) {
        errorHandler(res, 1);
        return;
      }

      if (req.body.model) {
        device.model = req.body.model;
      }

      device.save((err) => {
        if (err) {
          res.send(err);
          return;
        }

        successHandler(res, device);
      })
    });
  },

  /**
   * DELETE /devices/:id
   * delete device from database
   * id (req)
   */
  deleteDevice: (req, res) => {
    Device.findById(req.params.id, (err, device) => {
      if (err) {
        res.send(err);
        return;
      }

      if (!device) {
        errorHandler(res, 1);
        return;
      }

      device.remove(() => {
        successHandler(res, device);
      });
    });
  },

  /**
   * PUT /devices/:id/checkin
   * change device parameter checkedOut = false
   * id (req)
   */
  checkInDevice: (req, res) => {
    Device.findById(req.params.id, (err, device) => {
      if (err) {
        res.send(err);
        return;
      }

      if (!device) {
        errorHandler(res, 1);
        return;
      }

      device.checkedOut = false;
      device.save((err) => {
        if (err) {
          res.send(err);
          return;
        }

        successHandler(res, device);
      });
    });
  },

  /**
   * PUT /devices/:id/checkout
   * change device parameter checkedOut = true
   * id (req), checkedOutBy (req)
   */
  checkOutDevice: (req, res) => {
    Device.findById(req.params.id, (err, device) => {
      if (err) {
        res.send(err);
        return;
      }

      if (!device) {
        errorHandler(res, 1);
        return;
      }

      if (!req.body.checkedOutBy) {
        errorHandler(res, 2);
        return;
      }

      device.checkedOutBy = req.body.checkedOutBy;
      device.checkedOut = true;

      device.save((err) => {
        if (err) {
          res.send(err);
          return;
        }

        successHandler(res, device);
      });
    });
  }

};
