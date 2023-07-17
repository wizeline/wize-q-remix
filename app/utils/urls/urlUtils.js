export const getBaseUrl = () => process.env.BASE_URL || 'https://questions.wizeline.com';

export const getQuestionDetailUrl = (id) => `${getBaseUrl()}/questions/${id}`;
