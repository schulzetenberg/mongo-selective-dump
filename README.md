### Mongo Selective Dump

Utilizes the mongodump utility to dump only a subset of a collection. The subset is based on a date range set in config & uses the _id field to determine the date a document was created.

#### Configure
```
Edit the JSON files located in the config folder
```

#### Run
```
npm install
node dump
```

#### Restore to Local DB
```
mongorestore (--drop parameter is required in order to delete an existing collection of the same name)
```
