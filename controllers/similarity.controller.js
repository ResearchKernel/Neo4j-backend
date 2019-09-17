module.exports = () => {
  const contentSimilarityService =
        require('../services/contentSimilarity.service')();
    /**
     * Paper similarity controller
     */
  /**
     * 描述
     * @date 2019-09-15
     * @param {any} req
     * @param {any} res
     * @param {any} next
     * @param {any} {logger}
     * @return {any}
     */
  const getSimilarPapers = async (req, res, next, {neo4j, logger}) => {
    try {
      const payload = req.body;
      console.log(payload);
      const response = await contentSimilarityService
          .getSimilarPapers({payload, neo4j, logger});
      // console.log(response);
      logger.info(`Similar Papers Successfully found for `);
      res.status(200).send({'status': '200 OK', 'payload': response});
    } catch (error) {
      next(error);
    }
  };
  return {
    getSimilarPapers,
  };
};
