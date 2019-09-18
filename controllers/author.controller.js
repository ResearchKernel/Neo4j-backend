module.exports = () => {
  const authorService =
        require('../services/author.service')();
    /**
     * Paper similarity controller
     */
  /**
     * ćčż°
     * @date 2019-09-15
     * @param {any} req
     * @param {any} res
     * @param {any} next
     * @param {any} {logger}
     * @return {any}
     */
  const getAuthor = async (req, res, next, {neo4j, logger}) => {
    try {
      const payload = req.body;
      const response = await authorService
          .getAuthor({payload, neo4j, logger});

      logger.info(`Similar Papers Successfully found for `);
      res.status(200).send({'status': '200 OK', 'payload': response});
    } catch (error) {
      next(error);
    }
  };
  return {
    getAuthor,
  };
};
