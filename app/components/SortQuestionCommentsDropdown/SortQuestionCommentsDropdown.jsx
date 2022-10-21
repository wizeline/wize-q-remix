import {useState} from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_QUESTION_COMMENT_SORTING, ACTIVITY_TIME_QUESTION_COMMENT_SORTING } from '~/utils/constants';
import * as Styled from './SortQuestionCommentsDropdown.styled';
import { useSearchParams } from '@remix-run/react';

function SortQuestionCommentsDropdown(props) {
    SortQuestionCommentsDropdown.propTypes = {
      onSortCommentsOptionChange: PropTypes.func.isRequired,
      defaultSortingOptionText: PropTypes.string.isRequired,
    };
    const { onSortCommentsOptionChange, defaultSortingOptionText } = props;
    let [searchParams, setSearchParams] = useSearchParams();
  
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(defaultSortingOptionText);
  
    const sortOptions = [
      {
        displayText: 'Most voted',
        value: DEFAULT_QUESTION_COMMENT_SORTING,
      },
      {
        displayText: 'Recent activity',
        value: ACTIVITY_TIME_QUESTION_COMMENT_SORTING,
      },
    ];
  
    const onSortSelection = (displayText, value) => async () => {
      setSelectedOption(displayText);
      searchParams.set('order', value);
      setSearchParams(searchParams);
      setIsDropdownOpen(false);
      onSortCommentsOptionChange(value);
    };
  
    return (
      <Styled.DropDownContainer>
        <Styled.DropDownHeader
          onClick={() => setIsDropdownOpen(prevState => !prevState)}
        >
          {selectedOption}
        </Styled.DropDownHeader>
        {isDropdownOpen && (
          <Styled.DropDownListContainer>
            <Styled.DropDownList>
              {sortOptions.map(sortOption => (
                <Styled.ListItem className="dropdown-option" onClick={onSortSelection(sortOption.displayText, sortOption.value)} key={sortOption.value}>
                  {sortOption.displayText}
                </Styled.ListItem>
              ))}
            </Styled.DropDownList>
          </Styled.DropDownListContainer>
        )}
      </Styled.DropDownContainer>
    );
  }

export default SortQuestionCommentsDropdown;