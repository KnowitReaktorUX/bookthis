'use strict';

/**
 * ABOUT /api
 * returns information about the API
 */

/**
 * dependencies
 * -----------------------------------------------------------------------------
 */
const pkg = require('../package.json');

/**
 * route
 * -----------------------------------------------------------------------------
 */
module.exports = (req, res) => {
  res.json({
    description: pkg.description,
    version: pkg.version
  });
};
