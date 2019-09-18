module.exports = () => {
  // const neo4j = require('neo4j-driver').v1;
  // const driver = neo4j.driver('bolt://localhost:7687');
  // // const session = driver.session();
  const getAuthor = ({payload, neo4j, logger}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const session = neo4j.session();
        const author = payload.author;
        const limit = payload.limit;
        const skip = payload.offset;

        session
        // eslint-disable-next-line max-len
            .run('MATCH (n:paper)-[r:WRITTEN_BY]->(m:author) WHERE m.author = $author RETURN n SKIP $skip LIMIT $limit', {author: author, skip: skip, limit: limit})
            .then(function(result) {
              const resposeArray = [];

              result.records.forEach(function(record) {
                resposeArray.push(record._fields[0].properties);
              });
              resolve(resposeArray);
              neo4j.close();
            });
      } catch (err) {
        logger.info(err);
        reject(err);
      }
    });
  };
  return {
    getAuthor,

  };
};
