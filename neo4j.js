const neo4j = require('neo4j-driver').v1;
const config = require('./config');
const env = config['env'];
let uri = '';


if (config['isNeo4jUri']) {
  uri = config['neo4j_uri'];
} else if (env === 'production') {
  uri = `$ { config[neo4j_host] }: $ { config[neo4j_port] }`;
} else {
  uri = `$ { config[neo4j_host] }: $ { config[neo4j_port] }`;
}

// eslint-disable-next-line max-len
const neo4jConnection = neo4j.driver(uri, neo4j.auth.basic(config['neo4j_username'], config['neo4j_password']));

module.exports = neo4jConnection;
