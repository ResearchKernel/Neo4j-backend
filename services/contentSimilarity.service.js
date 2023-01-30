module.exports = () => {
  // const neo4j = require('neo4j-driver').v1;
  // const driver = neo4j.driver('bolt://localhost:7687');
  // // const session = driver.session();
  const getSimilarPapers = ({payload, neo4j, logger}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const session = neo4j.session();
        const arxivId = payload.arxiv_id;
        const limit = payload.limit;
        const skip = payload.offset;

        session
        // eslint-disable-next-line max-len
            .run('MATCH (n:paper)-[r:SIMILAR_TO]->(m:paper) WHERE n.arxiv_id = $payload RETURN r, m ORDER BY r.score DESC SKIP $skip LIMIT $limit', {payload: arxivId, skip: skip, limit: limit})
            .then(function(result) {
              const resposeArray = [];
              const responseDict = {};
              result.records.forEach(function(record) {
                responseDict['score'] = record._fields[0].properties;
                responseDict['paper'] = record._fields[1].properties;
                resposeArray.push(responseDict);
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
    getSimilarPapers,

  };
};
