# fi-credentials

Simple JSON credentials loader for local and S3 sources.



* * *

### fi-credentials.load(config, reload) 

Loads the credentials JSON file from the specified source.

**Parameters**

**config**: `Object`, Credentials configuration.

**reload**: `Boolean`, Whether to reload credentials even if in memory.

**Returns**: `Promise`, The load promise.


### fi-credentials.get(key) 

Retrieves credentials or values by property name.

**Parameters**

**key**: `Mixed`, The key to fetch. If empty, the whole object is returned.

**Returns**: `Mixed`, The requested key value or the full credentials object.



* * *










