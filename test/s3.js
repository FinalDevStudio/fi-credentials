'use strict';

delete require.cache[require.resolve('..')]; // Remove cached

const expect = require('chai').expect;
const credentials = require('..');

const CONFIG = require('./config');

describe('Fi Credentials from S3', function () {

  it('should be an object', function () {
    expect(credentials).to.be.an('object');
  });

  it('should have a load and get methods', function () {
    expect(credentials.load).to.be.a('function');
    expect(credentials.get).to.be.a('function');
  });

  it('should reject if config is not set', function (done) {
    credentials.load().then(() => {
      done(new Error('This shouldn\'t be called!'));
    }).catch(err => {
      expect(err).to.be.an('error');
      done();
    });
  });

  it('should reject if config is not an object', function (done) {
    credentials.load(1).then(() => {
      done(new Error('This shouldn\'t be called!'));
    }).catch(err => {
      expect(err).to.be.an('error');
      done();
    });
  });

  it('should reject if config.s3 is not an object', function (done) {
    const config = {
      source: 's3'
    };

    credentials.load(config).then(() => {
      done(new Error('This shouldn\'t be called!'));
    }).catch(err => {
      expect(err).to.be.an('error');
      done();
    });
  });

  it('should reject if config.s3.bucket is not a string', function (done) {
    const config = {
      source: 's3',
      s3: {}
    };

    credentials.load(config).then(() => {
      done(new Error('This shouldn\'t be called!'));
    }).catch(err => {
      expect(err).to.be.an('error');
      done();
    });
  });

  it('should reject if config.s3.apiVersion is not a string', function (done) {
    const config = {
      source: 's3',
      s3: {
        bucket: 'fi-credentials-test'
      }
    };

    credentials.load(config).then(() => {
      done(new Error('This shouldn\'t be called!'));
    }).catch(err => {
      expect(err).to.be.an('error');
      done();
    });
  });

  it('should reject if config.s3.apiVersion is not a string', function (done) {
    const config = {
      source: 's3',
      s3: Object.assign({}, CONFIG)
    };

    credentials.load(config).then(() => {
      done(new Error('This shouldn\'t be called!'));
    }).catch(err => {
      expect(err).to.be.an('error');
      done();
    });
  });

  it('should reject if credentials are not JSON', function (done) {
    const config = {
      source: 's3',
      s3: Object.assign({}, CONFIG, {
        key: 'credentials.txt'
      })
    };

    credentials.load(config).then(() => {
      done(new Error('This shouldn\'t be called!'));
    }).catch(err => {
      expect(err).to.be.an('error');
      done();
    });
  });

  it('should load valid JSON credentials', function (done) {
    const config = {
      source: 's3',
      s3: Object.assign({}, CONFIG, {
        key: 'credentials.1.json'
      })
    };

    credentials.load(config).then((creds) => {
      expect(creds).to.be.an('object');
      expect(creds.version).to.equal(1);
      expect(creds.source).to.equal('local');
      expect(creds.database).to.be.an('object');
      expect(creds.database.username).to.equal('test');
      expect(creds.database.password).to.equal('test');

      expect(credentials.get()).to.be.an('object');
      expect(credentials.get('version')).to.equal(1);
      expect(credentials.get('source')).to.equal('local');
      expect(credentials.get('database')).to.be.an('object');
      expect(credentials.get('database').username).to.equal('test');
      expect(credentials.get('database').password).to.equal('test');

      done();
    }).catch(done);
  });

  it('should resolve to in-memory credentials', function (done) {
    credentials.load().then((creds) => {
      expect(creds).to.be.an('object');
      expect(creds.version).to.equal(1);
      expect(creds.source).to.equal('local');
      expect(creds.database).to.be.an('object');
      expect(creds.database.username).to.equal('test');
      expect(creds.database.password).to.equal('test');

      expect(credentials.get()).to.be.an('object');
      expect(credentials.get('version')).to.equal(1);
      expect(credentials.get('source')).to.equal('local');
      expect(credentials.get('database')).to.be.an('object');
      expect(credentials.get('database').username).to.equal('test');
      expect(credentials.get('database').password).to.equal('test');

      done();
    }).catch(err => {
      console.error(err);
      done(err);
    });
  });

  it('should reload a valid JSON credentials', function (done) {
    const config = {
      source: 's3',
      s3: Object.assign({}, CONFIG, {
        key: 'credentials.2.json'
      })
    };

    credentials.load(config, true).then((creds) => {
      expect(creds).to.be.an('object');
      expect(creds.version).to.equal(2);
      expect(creds.source).to.equal('local');
      expect(creds.database).to.be.an('object');
      expect(creds.database.username).to.equal('test2');
      expect(creds.database.password).to.equal('test2');

      expect(credentials.get()).to.be.an('object');
      expect(credentials.get('version')).to.equal(2);
      expect(credentials.get('source')).to.equal('local');
      expect(credentials.get('database')).to.be.an('object');
      expect(credentials.get('database').username).to.equal('test2');
      expect(credentials.get('database').password).to.equal('test2');

      done();
    }).catch(err => {
      console.error(err);
      done(err);
    });
  });

});
