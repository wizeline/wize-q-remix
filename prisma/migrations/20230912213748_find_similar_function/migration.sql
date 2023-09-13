create or replace function find_answer(embedding vector(1536), match_threshold float, match_count int, min_content_length int)
 RETURNS TABLE(answer text, answer_date date, similarity float)
 LANGUAGE plpgsql
AS $$
#variable_conflict use_variable
begin
  return query
  select
    COALESCE(a.answer, c.comment) AS answer,
    COALESCE(a.answer_date, c.answer_date) as answer_date,
    (e.embedding <#> embedding) * -1 as similarity
    from questions q
    join embeddings e
    on q.question_id = e.question_id
    LEFT JOIN (
      SELECT
          answered_question_id,
          MAX(answer_date) as answer_date,
          MAX(answer_text) AS answer
      FROM wizeq.ANSWERS
      GROUP BY answered_question_id
    ) a ON q.question_id = a.answered_question_id
    LEFT JOIN (
      SELECT
          questionid,
          MAX(createdat) as answer_date,
          MAX(comment) AS comment
      FROM wizeq.Comments
      WHERE approvedby IS NOT NULL
      GROUP BY questionid
    ) c ON q.question_id = c.questionid
     where length(q.question) >= min_content_length

  and (e.embedding <#> embedding) * -1 > match_threshold

  order by e.embedding <#> embedding
  
  limit match_count;
end;
$$;
