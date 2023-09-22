/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFetcher } from '@remix-run/react';
import * as s from 'app/components/Modals/TagsModal/TagModal.styled';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Input from '../../Atoms/Input/Input';

function TagModal({
  onClose, selectTag, tag, removeTag,
}) {
  const fetcher = useFetcher();
  const [textTag, setTexTag] = useState('');
  const [tags, setTags] = useState([]);
  const { id } = tag;

  useEffect(() => {
    const url = id ? `/?tagId=${id}` : '/';
    fetcher.load(url);
  }, []);

  useEffect(() => {
    if (fetcher.data && fetcher.data.tagslist) {
      setTags(fetcher.data.tagslist.tags);
    }
  }, [fetcher.data]);

  const onChange = (event) => {
    setTexTag(event.target.value);
    const url = id ? `/?tagId=${id}&searchtag=${event.target.value}` : `/?searchtag=${event.target.value}`;
    fetcher.load(url);
  };

  return (
    <s.Wrapper>
      <s.Container>
        <s.CloseBtn onClick={onClose}> X </s.CloseBtn>
        <div>
          <Input
            type="text"
            placeholder="Search for a tag"
            onChange={(e) => onChange(e)}
            value={textTag}
          />
          <div>
            <h4>Select a tag for the comment</h4>
            <s.TagContaniner>
              {tags.length > 0 ? tags.map(({ tag_text, tag_id }) => (
                <>
                  <s.Tag key={`${tag_id}-tag`} onClick={() => { selectTag(tag_id); }} selected={tag_id === id}>
                    {tag_text}
                  </s.Tag>
                  {tag_id === id && (
                  <s.BtnRemoveTag onClick={removeTag}>
                    <AiOutlineCloseCircle size="20px" />
                  </s.BtnRemoveTag>
                  )}

                </>
              )) : 'No tags...'}
            </s.TagContaniner>
          </div>
        </div>
      </s.Container>
    </s.Wrapper>
  );
}

TagModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectTag: PropTypes.func.isRequired,
  removeTag: PropTypes.func.isRequired,
  tag: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
  }),
};

TagModal.defaultProps = {
  tag: null,
};

export default TagModal;
