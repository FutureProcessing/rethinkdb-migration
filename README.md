# rethinkdb-migration

RethinkDB migration tool allows you to handle database migration for your Node application.
Additionally you can define individual migration for stage, uat, etc.
Rethinkdb-migration will take care of running proper migration script from core directory and indicated implementation.

## Installation



## Configuration

You may configure rethinkdb-migration in two ways: by environment variables or provide configuration file.

### Environment variables.

##### Database configuration
```
TRM_DB_HOST,<br>
TRM_DB_PORT,<br>
TRM_DB_USER,<br>
TRM_DB_PASS,<br>
TRM_DB_NAME,<br>
```
##### Tool configuration
```
TRM_DB_TABLE, specify table where rethinkdb-migration keeps migration history<br>
TRM_DIR_MIGRATE,  specify directory where rethinkdb-migration keeps migration scripts<br>
TRM_DIR_IMPLEMENTATION, specify directory with additional implementation e.g STAGE, UAT<br>
```

### Configuration file

If you do not want to add environment variables to your system you may provide configuration file instead.
```javascript
{
  "DB_HOST": "192.168.10.30",
  "DB_PORT": "28015",
  "DB_USER": "",
  "DB_PASS": "",
  "DB_NAME": "rethinkMigrateTest",
  "DB_TABLE": "toolRethingDBMigrate",
  "DIR_MIGRATE": "./migrate",
  "DIR_IMPLEMENTATION": "stage"
}
````
Example file with default data you can find at **config/config-default.json**

## Usage

Lets create migration script with query which creates new table in database.
Thus, we use config file to provide configuration for rethingdb-migration.
##### Define following data in *config-example.json*
```javascript
{
  "DB_HOST": "localhost",
  "DB_PORT": "2815",
  "DB_USER": "",
  "DB_PASS": "",
  "DB_NAME": "rethinkMigrateTest",
  "DB_TABLE": "toolRethingDBMigrate",
  "DIR_MIGRATE": "./migrate",
  "DIR_IMPLEMENTATION": ""
}
````
##### Generate migration script from template. Use following command:

```
node rethinkdb-migration -cs example-migration --config="./../config/config-example.json"
```

Above command creates file with name based on pattern **yyyyMMdd_HHmm-example-migration.js** in **migrate** directory.

Generated file should have following content:

```javasctipt
async function up(rethink, migrate) {
    await migrate.finishMigrationScript();
}

module.exports = {
    up
};
```

##### Add rethinkdb query in order to create new table.

```javasctipt
async function up(rethink, migrate) {
    await rethink.getReQL().tableCreate('exampleTable').run();
    await migrate.finishMigrationScript();
}

module.exports = {
    up
};
```

or you may use method **createMissingTables()**

```javasctipt
async function up(rethink, migrate) {
    rethink.createMissingTables('exampleTable');
    await migrate.finishMigrationScript();
}

module.exports = {
    up
};
```

#### Running

Created migration can be launched by the command
```
node rethinkdb-migration --config="./../config/config-default.json"
```
When you run above command table exampleTable will be create in database which you defined in configuration file.

In table toolRethingDBMigrate you can see migration history.
```javascript
{

    "date": Wed Jan 31 2018 11:47:31 GMT+00:00 ,
    "fileName": "20180131_1241-example-migration.js" ,
    "id": "89a98790-a51b-4eaa-a55e-d4906cde7341" ,
    "version": "20180131_1241"

}
```

Helpers

Method | Parameters type | Description
---|---|---|
getReQl() | | Returns rethinkdbdash object.
closeConnection() | | Closes connection to database. It is an alias to `this.getReQL().getPoolMaster().drain();`
createDatabase(databaseName) | {String} databaseName | Creates database based on given name.
createMissingTables(tablesName) | {Array} tablesName | Creates tables based on given table names.
