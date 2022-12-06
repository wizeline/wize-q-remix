import XSS from 'xss';
import { SHOW_LESS_TEXT, SHOW_MORE_TEXT } from './constants';

export function deleteNoMarkupFormatHTML(content) {
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

export function addS(text, num) {
  return num === 1 ? text : `${text}s`;
}

// eslint-disable-next-line max-len
export const showCollapseOrExpandMessage = (isCollapsed) => (isCollapsed ? SHOW_MORE_TEXT : SHOW_LESS_TEXT);

export const formatCollapsingText = (text, shouldCollapse, isCollapsed, minLength) => {
  if (shouldCollapse && isCollapsed) {
    const indexOfLastSpace = text.lastIndexOf(' ', minLength);
    return `${text.substring(0, indexOfLastSpace).trim()}...`;
  }

  return text;
};
