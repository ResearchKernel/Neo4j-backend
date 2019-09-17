const dotenv = require('dotenv');
dotenv.config();
const config = require('./config');
const express = require('express');
/**
 * Middleware Decleration
 */

// using CORS
const cors = require('cors');
// Body Parser for req/res
const bodyParser = require('body-parser');
// Bunyan logger
const logger = require('./logger')();

/**
 * I'll add redis later in this.
 *
 * */


/**
 * Other variables
 */
// Configure isProduction variable
const isProduction = config['env'] === 'production';

// Application Init
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(bodyParser.json());
// Configure databases here.
const neo4j = require('./neo4j');

app.get('/', (req, res, next) => {
  res.send({
    code: 200,
    message: 'Faad chal rha hai.',
  });
});

/**
 *
 * REST APIS
 */

app.use(
    '/api/v1',
    require('./router/paper')({
      neo4j,
      logger,
    })
);

/**
 * Error handlers & middlewares
 */
app.use((err, req, res, next) => {
  logger.error(`[${req.method}][${req.url}] - ${JSON.stringify(err)}`);
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      stack: isProduction ? {} : err,
    },
  });
});

/**
 * Server
 */
app.listen(config['port'], () => {
  console.log(`Server listening on port: ${config['port']}`);
});
