'use strict';

const S3 = require('aws-sdk/clients/s3');
const is = require('fi-is');
const fs = require('fs');

const S3_SOURCE = /^s3$/i;

let debug = () => {};
let credentials = {};

/**
 * Loads credentials from local.
 *
 * @param {Object} config The config object.
 * @param {Function} resolve Promise resolve callback.
 * @param {Function} reject Promise resolve callback.
 *
 * @throws {Error} Configuration error.
 */
function loadFromLocal(config, resolve, reject) {
  if (is.not.object(config.local)) {
    throw new Error('Config local must be an object!');
  }

  if (is.not.string(config.local.path)) {
    throw new Error('Local path version must be a string!');
  }

  debug(`Retrieving credentials from local (${ config.local.path })...`);

  fs.readFile(config.local.path, 'utf8', (err, data) => {
    if (err) {
      debug(err);
      return reject(err);
    }

    try {
      credentials = JSON.parse(data);

      debug(credentials);

      resolve();
    } catch (ex) {
      debug(err);
      reject(ex);
    }
  });

}

/**
 * Loads credentials from S3.
 *
 * @param {Object} config The config object.
 * @param {Function} resolve Promise resolve callback.
 * @param {Function} reject Promise resolve callback.
 *
 * @throws {Error} Configuration error.
 */
function loadFromS3(config, resolve, reject) {
  if (is.not.object(config.s3)) {
    throw new Error('Config S3 must be an object!');
  }

  if (is.not.string(config.s3.apiVersion)) {
    throw new Error('S3 API version must be a string!');
  }

  if (is.not.string(config.s3.bucket)) {
    throw new Error('S3 Bucket must be a string!');
  }

  if (is.not.string(config.s3.key)) {
    throw new Error('S3 Key must be a string!');
  }

  const s3bucket = new S3({
    apiVersion: config.s3.apiVersion,
    params: {
      Bucket: config.s3.bucket
    }
  });

  const params = {
    Key: config.s3.key
  };

  debug(`Retrieving credentials from S3 (${ config.s3.bucket }/${ config.s3.key })...`);

  s3bucket.getObject(params, (err, data) => {
    if (err) {
      debug(err);
      return reject(err);
    }

    try {
      credentials = JSON.parse(Buffer(data.Body).toString('utf8'));

      debug(credentials);

      resolve();
    } catch (ex) {
      debug(err);
      reject(ex);
    }
  });
}

/**
 * Loads the credentials from S3.
 *
 * @param {Object} config Credentials configuration.
 *
 * @throws {Error} Configuration error.
 *
 * @returns {Promise} The load promise.
 */
function load(config) {
  return new Promise((resolve, reject) => {
    if (is.not.object(config)) {
      return reject(new Error('Config must be an object!'));
    }

    if (is.function(config.debug)) {
      debug = config.debug;
    } else if (is.boolean(config.debug) && debug) {
      debug = console.log;
    }

    if (S3_SOURCE.test(config.source)) {
      return loadFromS3(config, resolve, reject);
    }

    return loadFromLocal(config, resolve, reject);
  });
}

/**
 * Retreives credentials.
 *
 * @param {Mixed} key The key to fetch. If empty, the whole object is returned.
 *
 * @returns {Mixed} The requested key value or credentials object.
 */
function get(key) {
  if (is.not.empty(key)) {
    return credentials[key];
  }

  return credentials;
}

module.exports = {
  load,
  get
};
