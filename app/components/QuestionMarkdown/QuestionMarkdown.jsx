import PropTypes from 'prop-types';
import * as Styled from './QuestionMarkdown.Styled';
import gfm from 'remark-gfm';
import MarkdownLinkRenderer from '~/components/MarkdownLinkRenderer';

const QuestionMarkdown = props => (
  <Styled.QuestionMarkdown
    children={props.source}
    components={{
      link: MarkdownLinkRenderer,
    }}
    remarkPlugins={[gfm]}
  />
);

QuestionMarkdown.propTypes = {
  source: PropTypes.string.isRequired,
};

export default QuestionMarkdown;
