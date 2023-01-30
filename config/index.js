module.exports = {
  // server configurations
  port: 3000,
  name: 'neo4j-backend',
  env: process.env.NODE_ENV,
  base_uri: process.env.BASE_URI,
  host: process.env.HOST,

  // neo4j configuration
  isNeo4jUri: true,
  neo4j_host: process.env.NEO4J_HOST,
  neo4j_port: process.env.NEO4J_PORT,
  neo4j_username: process.env.NEO4J_USERNAME,
  neo4j_password: process.env.NEO4J_PASSWORD,
  neo4j_uri: 'bolt://localhost:7687',

  // aws-sdk config
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
  aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
  aws_region: process.env.AWS_REGION,
};
