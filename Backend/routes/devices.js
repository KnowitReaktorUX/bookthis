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
      res.send({
        status: 'error',
        message: 'device need parameter id to be created.'
      });
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

        res.json({
          status: 'success',
          data: device
        })
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

      res.json({
        status: 'success',
        data: devices
      });
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
        res.json({
          status: 'error',
          message: 'device not found in database.'
        });
        return;
      }

      res.json({
        status: 'success',
        data: device
      })
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
        res.json({
          status: 'error',
          message: 'device not found in database.'
        });
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

        res.json({
          status: 'success',
          data: device
        })
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
        res.json({
          status: 'error',
          message: 'device not found in database'
        });
        return;
      }

      device.remove(() => {
        res.json({
          status: 'success',
          data: device
        })
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
        res.json({
          status: 'error',
          message: 'device not found in database.'
        });
        return;
      }

      device.checkedOut = false;
      device.save((err) => {
        if (err) {
          res.send(err);
          return;
        }

        res.json({
          status: 'success',
          data: device
        });
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
        res.json({
          status: 'error',
          message: 'device not found in database.'
        });
        return;
      }

      if (!req.body.checkedOutBy) {
        res.json({
          status: 'error',
          message: 'route need body parameter checkedOutBy.'
        });
        return;
      }

      device.checkedOutBy = req.body.checkedOutBy;
      device.checkedOut = true;

      device.save((err) => {
        if (err) {
          res.send(err);
          return;
        }

        res.json({
          status: 'success',
          data: device
        });
      });
    });
  }

};
