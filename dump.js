const { exec } = require('child_process');
const config  = require('config');

var query = '{ "_id": { "$gt": ' + dateToId(config.start) + ', "$lte": ' + dateToId(config.end) + ' }}';
var command = "mongodump --db " + config.db + " --collection " + config.collection + " --query '" + query + "'";

if(config.port) command += ' --port ' + config.port;
if(config.host) command += ' --host ' + config.host;

if(config.username && config.password && config.authenticationDatabase) {
  command += ' --username ' + config.username + ' --password ' + config.password + ' --authenticationDatabase ' + config.authenticationDatabase;
}

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

// Convert a date into an ObjectId string
// Accepts both Date object and string input
function dateToId(timestamp) {
  // Convert string date to Date object (otherwise assume timestamp is a date)
  if (typeof(timestamp) == 'string') {
    timestamp = new Date(timestamp);
  }

  // Convert date object to hex seconds since Unix epoch
  let hexSeconds = Math.floor(timestamp / 1000).toString(16);

  return 'ObjectId("' + hexSeconds + '0000000000000000")';
}
