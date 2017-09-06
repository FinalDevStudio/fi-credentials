'use strict';

const expect = require('chai').expect;
const credentials = require('..');

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
      s3: {
        bucket: 'fi-credentials-test',
        apiVersion: '2006-03-01'
      }
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
      s3: {
        bucket: 'fi-credentials-test',
        apiVersion: '2006-03-01',
        key: 'credentials.txt'
      }
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
      s3: {
        bucket: 'fi-credentials-test',
        apiVersion: '2006-03-01',
        key: 'credentials.json'
      }
    };

    credentials.load(config).then(() => {
      expect(credentials.get()).to.be.an('object');
      expect(credentials.get('version')).to.equal(1);
      expect(credentials.get('source')).to.equal('s3');
      expect(credentials.get('database')).to.be.an('object');
      expect(credentials.get('database').username).to.equal('test');
      expect(credentials.get('database').password).to.equal('test');

      done();
    }).catch(done);
  });

});
