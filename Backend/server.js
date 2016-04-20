'use strict';

/**
 * dependencies
 * -----------------------------------------------------------------------------
 */
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

/**
 * pre route configuration
 * -----------------------------------------------------------------------------
 */
const app = express();
const port = 51915;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(cors({
  origin: '*',
  methods: ['DELETE', 'GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type']
}));

/**
 * routes
 * -----------------------------------------------------------------------------
 */
const router = express.Router();

router.get('/', require('./routes/api.js'));

router.route('/devices')
  .get(require('./routes/devices.js').getDevices)
  .post(require('./routes/devices.js').createDevice);

router.route('/devices/:id')
  .delete(require('./routes/devices.js').deleteDevice)
  .get(require('./routes/devices.js').getDevice)
  .put(require('./routes/devices.js').updateDevice);

router.route('/devices/:id/checkin')
  .put(require('./routes/devices.js').checkInDevice);

router.route('/devices/:id/checkout')
  .put(require('./routes/devices.js').checkOutDevice);

/**
 * post route configuration
 * -----------------------------------------------------------------------------
 */
app.use('/api', router);

/**
 * execution
 * -----------------------------------------------------------------------------
 */
app.listen(port);
