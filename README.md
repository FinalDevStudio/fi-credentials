---
### No longer maintained.
---

# Fi Credentials

[![Build Status](https://travis-ci.org/FinalDevStudio/fi-credentials.svg?branch=master)](https://travis-ci.org/FinalDevStudio/fi-credentials) [![npm](https://img.shields.io/npm/v/fi-credentials.svg)]() [![npm](https://img.shields.io/npm/l/express.svg)]()

Simple JSON credentials loader for local and S3 sources.


## Installing
```sh
npm install --save fi-credentials
```


## Usage

```js
const credentials = require('fi-credentials');
```


### Loading credentials

This module exports an `Object` that exposes the following `Functions`:

```js
const credentials = require('fi-credentials');

credentials.load(config).then((creds) => {
  console.log('Credentials loaded!', creds);

  creds // All the credentials object.
  credentials.get(); // All the credentials object.

  creds.database; // Database property values only.
  credentials.get('database'); // Database property values only.
})

.catch(err => {
  throw err;
});
```

**IMPORTANT:** Your credential's file must be a valid JSON file.


### Configuration

It must be an `Object` with the following parameters:

| Param | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `source` | `String` | No | `undefined` | Can be used specify `'s3'` as source. Anything else will be local by default. |
| `debug` | `Function\|Boolean` | No | `Function` | Can be a `Function` to log with or a `Boolean`. If `true` it will use `console.log`. |
| `s3` | `Object` | If `source` is `'s3'` | `undefined` | This is the get object params config for the AWS SDK S3 client. |
| `s3.bucket` | `String` | If `source` is `'s3'` | `undefined` | The S3 bucket name from where to obtain the object. |
| `s3.key` | `String` | If `source` is `'s3'` | `undefined` | The S3 bucket key name from where to obtain the credentials file. |
| `s3.apiVersion` | `String` | If `source` is `'s3'` | `undefined` | The S3 API version to use. |
| `local` | `Object` | If `source` is not `'s3'` | `undefined` | The local configuration object. |
| `local.path` | `String` | If `source` is not `'s3'` | `undefined` | The local path to the credentials file. |


#### Example

```js
const config = {

  source: 's3', // Or anything else for local.

  debug: true, // Or you may use the debug module function.

  s3: {
    key: 'path/to/credentials.json',

    apiVersion: '2006-03-01',

    bucket: 'bucket-name'
  },

  local: {
    path: '/local/path/to/credentials.json'
  }

};
```


# API

View the [API docs here](docs/index.md).
