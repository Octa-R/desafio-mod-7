import algoliasearch from "algoliasearch"

const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_WRITE_API_KEY);
const index = client.initIndex('lostpets');

export { index }