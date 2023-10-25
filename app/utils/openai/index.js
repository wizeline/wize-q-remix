const OpenAI = require('openai');
const { EMBEDDINGS_MODEL } = require('../constants');

const API_KEY = process.env.OPENAI_API_KEY;

const instantiateOpenAi = () => {
  const instance = API_KEY ? new OpenAI({
    apiKey: API_KEY,
  }) : undefined;

  return instance;
};
const requestEmbedding = async (instance, prompts) => {
  if (!instance) {
    return undefined;
  }

  try {
    const embeddings = await instance.embeddings.create({
      model: EMBEDDINGS_MODEL,
      input: prompts,
    });

    return embeddings;
  } catch (error) {
    /* eslint-disable no-console */
    console.error(error);
    return undefined;
  }
};

module.exports = {
  requestEmbedding,
  instantiateOpenAi,
};
