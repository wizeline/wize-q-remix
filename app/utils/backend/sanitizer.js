const XSS = require('xss');

function sanitizeHTML(content) {
  const token = '`';
  const options = {
    whiteList: [],
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script'],
    escapeHtml: (html) => html,
  };
  const splitContent = content.split(token);
  const contentLength = splitContent.length;
  let finalContent = '';
  for (let i = 1; i < contentLength; i += 2) {
    finalContent += XSS(splitContent[i - 1], options);
    finalContent += token + splitContent[i] + token;
  }
  if (contentLength % 2 === 1) {
    finalContent += XSS(splitContent[contentLength - 1], options);
  }
  return finalContent;
}

export {
  sanitizeHTML,
};
