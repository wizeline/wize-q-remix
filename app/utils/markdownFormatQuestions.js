import { renderToStaticMarkup } from 'react-dom/server';
import Markdown from 'react-markdown';
import SearchedLinkRenderer from '~/components/SearchedLinkRenderer';
import { HIGHLIGHT_END, HIGHLIGHT_START } from '~/utils/constants';

const addTagsToText = srcText => srcText.replace(
  /(#[a-z\d]+)/ig,
  x => ` [${x}](/?tag=${x.slice(1)})`,
);

const removeQuestionLinksInsideCode = srcText => srcText.replace(
  /`.*?`/g,
  x => x.replace(
    /\[(Q\d+)\]\(\/\?questionId=\d+\)/g,
    '$1',
  ),
);

/*
 * Substitute Q{number} for a link to a question.
 *
 * All formats are supported but code `Q23`, in this case the link is not inserted
 */
const addQuestionsToText = srcText => removeQuestionLinksInsideCode(srcText.replace(
  /\b(?!`)\b(Q[0-9]+)\b(?!`)/g,
  x => `[${x}](/?questionId=${x.slice(1)})`,
));

const highlightText = (srcText, searchTerm) => {
  const searchRegExp = new RegExp(
    searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    'gi',
  );

  let formattedText = srcText.replace(
    searchRegExp,
    text => HIGHLIGHT_START + text + HIGHLIGHT_END,
  );

  formattedText = renderToStaticMarkup((
    <Markdown
      source={formattedText}
      escapeHtml={false}
      renderers={{
        link: SearchedLinkRenderer,
      }}
    />
  ));

  formattedText = formattedText.replace(new RegExp(HIGHLIGHT_START, 'g'), '<highlight>');
  formattedText = formattedText.replace(new RegExp(HIGHLIGHT_END, 'g'), '</highlight>');
  return formattedText;
};

export const markdownFormat = (srcText, searchTerm) => {
  let formattedText = addTagsToText(srcText);

  if (searchTerm) {
    formattedText = highlightText(formattedText, searchTerm);
  }

  return formattedText;
};

export const markdownFormatQuestion = (srcText, searchTerm) => {
  const formattedText = addQuestionsToText(srcText);
  return markdownFormat(formattedText, searchTerm);
};

export default markdownFormatQuestion;
