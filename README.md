# Fi Credentials

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

credentials.load(config).then(() => {
  console.log('Credentials loaded!');

  credentials.get(); // All the credentials object.
  credentials.get('database'); // Database property values only.
})

.catch(err => {
  throw err;
});
```


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

Your credential's file must be a valid JSON file. This will be stored into the module to acces its properties with the followind methods:

| Method | Arguments | Returns | Description
| --- | --- | --- |---|
| `load` | `config` | `Promise` | This method is used to load the credentials using the provided configuration object. |
| `get` | `key` | `Mixed` | If key is not empty, it will return the value for that key in the loaded credentials object. If key is empty, then it'll return the complete credentials object. |
