/* eslint-disable max-len */
export const validTextLength = (currentTextLength, minTextLength, maxTextLength) => currentTextLength >= minTextLength && currentTextLength <= maxTextLength;

export const shouldShowMarkdownSuggestions = (textLength, minLength, windowWidth, minWidth) => windowWidth > minWidth && textLength > minLength;
