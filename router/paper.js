module.exports = ({neo4j, logger}) => {
  const express = require('express');
  // eslint-disable-next-line new-cap
  const router = express.Router();
  // eslint-disable-next-line max-len
  const similarityController = require('../controllers/similarity.controller')();
  /**
     * paper similarity routes
     */
  router
      .route('/similarpaper')
      .get((req, res, next) => similarityController
          .getSimilarPapers(req, res, next, {neo4j, logger}));
  return router;
};
