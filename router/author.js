module.exports = ({neo4j, logger}) => {
  const express = require('express');
  // eslint-disable-next-line new-cap
  const router = express.Router();
  // eslint-disable-next-line max-len
  const authorController = require('../controllers/author.controller')();
  /**
     * Author routes
     */
  router
      .route('/author')
      .post((req, res, next) => authorController
          .getAuthor(req, res, next, {neo4j, logger}));
  return router;
};
