const OpenAI = require('openai');
const { EMBEDDINGS_MODEL } = require('../constants');

const API_KEY = process.env.OPENAI_API_KEY;

const instantiateOpenAi = () => (API_KEY ? new OpenAI({
  apiKey: API_KEY,
}) : undefined);

const requestEmbedding = async (instance, prompts) => {
  if (!instance) {
    return {};
  }

  const embeddings = await instance.embeddings.create({
    model: EMBEDDINGS_MODEL,
    input: prompts,
  });

  return embeddings;
};

module.exports = {
  requestEmbedding,
  instantiateOpenAi,
};
