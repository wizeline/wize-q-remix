import { db } from 'app/utils/db.server';
import { instantiateOpenAi, requestEmbedding } from 'app/utils/openai';

const upsertQuestionEmbedding = async (questionId, answer) => {
  const openai = instantiateOpenAi();
  const { data } = (await requestEmbedding(openai, [answer])) || {};
  const embeddings = data?.map((obj) => obj.embedding);
  const embedding = (embeddings && embeddings.length > 0) ? embeddings[0] : null;

  if (!embedding) {
    return undefined;
  }

  // Vector is unsupported natively in prisma so we need to do this using raw queries
  const found = await db.embeddings.findFirst({
    where: {
      question_id: questionId,
    },
  });

  if (found) {
    return db.$executeRaw`
        UPDATE embeddings 
        SET embedding = ${embedding}::vector
        WHERE question_id = ${questionId}
   `;
  }

  return db.$executeRaw`
        INSERT into embeddings 
        (question_id, embedding) 
        VALUES (${questionId}, ${embedding}::vector)
   `;
};

export default upsertQuestionEmbedding;
