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
   * id
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

    device.id = req.body.id;

    device.save((err) => {
      if (err) {
        res.send(err);
      }

      Device.find({id: req.body.id}, (err, devices) => {
        if (err) {
          res.send(err);
        }

        const device = devices[0] ? devices[0] : false;

        if (device === false) {
          res.json({
            status: 'error',
            message: 'device not found in database.'
          });
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
   * id
   */
  getDevice: (req, res) => {
    Device.find({id: req.params.id}, (err, devices) => {
      if (err) {
        res.send(err);
      }

      const device = devices[0] ? devices[0] : false;

      if (device === false) {
        res.json({
          status: 'error',
          message: 'device not found in database.'
        });
        return;
      }

      res.json({
        status: 'success',
        data: device
      });
    });
  },

  /**
   * PUT /devices/:id
   * updating information about device
   * TODO make dynamics
   */
  updateDevice: (req, res) => {
    Device.find({id: req.params.id}, (err, devices) => {
      if (err) {
        res.send(err);
      }

      const device = devices[0] ? devices[0] : false;

      if (device === false) {
        res.json({
          status: 'error',
          message: 'device not found in database.'
        });
        return;
      }

      device.name = req.body.name;

      device.save((err) => {
        if (err) {
          res.send(err);
        }

        res.json({
          status: 'success',
          data: device
        });
      });
    });
  },

  /**
   * DELETE /devices/:id
   * delete device from database
   * id
   */
  deleteDevice: (req, res) => {
    Device.remove({id: req.params.id}, (err, response) => {
      if (err) {
        res.send(err);
      }

      res.json({
        status: 'success',
        data: response
      });
    });
  },

  /**
   * PUT /devices/:id/checkin
   * change device parameter checkedOut = false
   * id
   */
  checkInDevice: (req, res) => {
    Device.find({id: req.params.id}, (err, devices) => {
      if (err) {
        res.send(err);
      }

      const device = devices[0] ? devices[0] : false;

      if (device === false) {
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
   * id, checkedOutBy
   */
  checkOutDevice: (req, res) => {
    Device.find({id: req.params.id}, (err, devices) => {
      if (err) {
        res.send(err);
      }

      const device = devices[0] ? devices[0] : false;

      if (device === false) {
        res.json({
          status: 'error',
          message: 'device not found in database.'
        });
        return;
      }

      if (!req.body.checkedOutBy) {
        res.send({
          status: 'error',
          message: 'route need paramater checkedOutBy.'
        });
        return;
      }

      device.checkedOutBy = req.body.checkedOutBy;
      device.checkedOut = true;
      device.save((err) => {
        if (err) {
          res.send(err);
        }

        res.json({
          status: 'success',
          data: device
        });
      });
    });
  }

};
