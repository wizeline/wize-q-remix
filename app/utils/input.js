/* eslint-disable max-len */
export const displayTextLength = (currentValue, maxValue) => `${currentValue}/${maxValue}`;

export const validTextLength = (currentTextLength, minTextLength, maxTextLength) => currentTextLength >= minTextLength && currentTextLength <= maxTextLength;

export const shouldShowMarkdownSuggestions = (textLength, minLength, windowWidth, minWidth) => windowWidth > minWidth && textLength > minLength;
