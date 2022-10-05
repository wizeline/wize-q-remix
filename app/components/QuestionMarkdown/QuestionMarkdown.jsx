import PropTypes from 'prop-types';
import * as Styled from './QuestionMarkdown.styled';
import gfm from 'remark-gfm';
import MarkdownLinkRenderer from '~/components/MarkdownLinkRenderer';

const QuestionMarkdown = props => (
  <Styled.QuestionMarkdown
    source={props.source}
    escapeHtml={false}
    renderers={{
      link: MarkdownLinkRenderer,
    }}
    plugins={[gfm]}
  />
);

QuestionMarkdown.propTypes = {
  source: PropTypes.string.isRequired,
};

export default QuestionMarkdown;
