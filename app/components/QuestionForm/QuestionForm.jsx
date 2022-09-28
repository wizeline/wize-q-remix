import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ContentState, convertFromRaw, EditorState } from 'draft-js';
import { markdownToDraft } from 'markdown-draft-js';
import { RiArrowRightSFill } from 'react-icons/ri';

import {
  DEFAULT_LOCATION,
  ANONYMOUS_USER,
  HTML_CODE_WARNING,
  MINIMUM_QUESTION_LENGTH,
  MAXIMUM_QUESTION_LENGTH,
  NO_DEPARTMENT_SELECTED_TOOLTIP_MESSAGE,
  MIN_CHARS_QUESTION_INPUT_TOOLTIP_MESSAGE,
  DEFAULT_MESSAGE_END_QUESTION_INPUT_TOOLTIP,
  NO_LOCATIONS_AVAILABLE_TOOLTIP_MESSAGE,
  NONE_LOCATION,
  DEFAULT_LOCATION_MESSAGE,
  ALL_LOCATIONS_MESSAGE,
  LOCATION_WARNING,
  NO_DEPARTMENT_SELECTED_ID,
  NOT_ASSIGNED_DEPARTMENT_ID,
} from '~/utils/constants';
import * as Styled from './QuestionForm.Styled';
import QuestionAssigner from '~/components/QuestionAssigner';
import QuestionLocation from '~/components/QuestionLocation';
import Switch from '~/components/Switch';
import InputAuthor from '~/components/InputAuthor';
import InputCounter from '~/components/InputCounter';
import SubmitWithModal from '~/components/SubmitWithModal';
import { deleteNoMarkupFormatHTML } from '~/utils/stringOperations';
import { validTextLength } from '~/utils/input';
import QuestionInputText from '~/components/QuestionInputText';
import { useUser } from '~/utils/hooks/useUser';

const QuestionForm = ({
  postQuestion,
  locations,
  departments,
  initialValue,
  initialDepartment,
  initialIsAnonymous,
}) => {

  const { full_name, picture } = useUser();

  const initialState = {
    inputValue: initialValue,
    isAnonymous: initialIsAnonymous,
    showSubmitWithModal: false,
    dropDownTitle: postQuestion,
    warnings: [],
    location: NONE_LOCATION,
    closed: false,
    isAsking: false,
    profilePicture: picture,
    assignedDepartment: initialDepartment,
    fullLocation: '',
    isShowPreview: false,
    askButtonEnabled: false,
  };

  const [navigate, setNavigate] = useState(null);

  const [state, setState] = useState(initialState);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(convertFromRaw(markdownToDraft(state.inputValue))),
  );

  const setQuestionInputTextRef = (instance) => { this.questionInputText = instance; };

  const selectPostingAs = (username) => {
    const isAnonymous = (username === ANONYMOUS_USER.username);
    const profilePicture = isAnonymous ? ANONYMOUS_USER.profilePicture : picture;
    setState({
      ...state,
      dropDownTitle: username,
      profilePicture,
      isAnonymous,
    });
  };

  useEffect(() => {
    selectPostingAs(full_name);
  }, [full_name]);

  const clearTextArea = () => {
    setEditorState(() =>
      EditorState.push(editorState, ContentState.createFromText(''), 'remove-range'),
    );
  };

  const onSubmitWithModalSuccess = async () => {
    const { location, isAnonymous, inputValue, assignedDepartment } = state;
    setState({ ...state, showSubmitWithModal: false });

    const question = {
      isAnonymous,
      question: deleteNoMarkupFormatHTML(inputValue.trim()),
      location: location === NONE_LOCATION ? DEFAULT_LOCATION : location,
      assignedDepartment: assignedDepartment.department_id || 'wizeq',
    };

    try {
      await postQuestion(question);
      setState(initialState);
      clearTextArea();
      setNavigate('/');
    } catch (error) {
      throw error;
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const {
      location,
      isAnonymous,
      inputValue,
    } = state;
    const trimmed = inputValue.trim();
    const sanitizedInput = deleteNoMarkupFormatHTML(trimmed);

    const warningsToShow = [];

    setState({
      ...state,
      isAsking: true,
    });

    if (location === NONE_LOCATION) {
      warningsToShow.push(DEFAULT_LOCATION_MESSAGE);
    } else if (location === DEFAULT_LOCATION) {
      warningsToShow.push(ALL_LOCATIONS_MESSAGE);
    } else {
      const prelocation = locations.find(
        loc => loc.code === location);
      const fullLocation = prelocation ? prelocation.name : '';
      warningsToShow.push(LOCATION_WARNING + fullLocation);
    }
    if (trimmed !== sanitizedInput) {
      warningsToShow.push(HTML_CODE_WARNING);
    }

    if (warningsToShow.length || !isAnonymous) {
      setState({
        ...state,
        warnings: [...warningsToShow],
        showSubmitWithModal: true,
        isAsking: false,
      });
      return;
    }
    onSubmitWithModalSuccess();
  };

  const onLocationChange = (selectedLocation) => {
    setState({
      ...state,
      location: selectedLocation,
      fullLocation: locations.find(
        loc => loc.code === selectedLocation,
      ).name,
    });
  };

  const onSubmitWithModalClose = () => {
    setState({
      ...state,
      showSubmitWithModal: false,
      warnings: [],
    });
  };

  const onInputChange = (inputValue) => {
    setState({ ...state, inputValue });
  };

  const getClasses = (askButtonEnabled, departmentId) => {
    // eslint-disable-next-line no-unneeded-ternary
    const askButtonClass = askButtonEnabled ? false : true;
    const employeeDropdownClass = (departmentId !== NOT_ASSIGNED_DEPARTMENT_ID &&
      departmentId !== NO_DEPARTMENT_SELECTED_ID) ? '' : 'employee-dropdown--department-assigned';
    const locationDropdownClass = departmentId !== NO_DEPARTMENT_SELECTED_ID ?
      '' : 'location-dropdown--department-selected';
    return {
      askButtonClass,
      employeeDropdownClass,
      locationDropdownClass,
    };
  };


  const handleDepartmentSelectChange = (selectedDepartment) => {
    setState({
      ...state,
      assignedDepartment: selectedDepartment,
    });
  };

  const isAllowedToSubmitQuestion = () => {
    const {
      assignedDepartment,
      inputValue,
    } = state;

    const sanitizedInput = deleteNoMarkupFormatHTML(inputValue.trim());

    let askButtonEnabled = true;
    let tooltipMessage = '';
    if (!validTextLength(sanitizedInput.length, MINIMUM_QUESTION_LENGTH, MAXIMUM_QUESTION_LENGTH)) {
      askButtonEnabled = false;
      tooltipMessage = MIN_CHARS_QUESTION_INPUT_TOOLTIP_MESSAGE;
    }

    if (assignedDepartment.department_id === NO_DEPARTMENT_SELECTED_ID) {
      askButtonEnabled = false;
      tooltipMessage = NO_DEPARTMENT_SELECTED_TOOLTIP_MESSAGE;
    }

    if (locations.length === 0) {
      askButtonEnabled = false;
      tooltipMessage = NO_LOCATIONS_AVAILABLE_TOOLTIP_MESSAGE;
    }

    return {
      askButtonEnabled,
      tooltipMessage,
    };
  };

  const renderTooltip = tooltipMessage =>
    tooltipMessage && (
      <Styled.SubmitTooltipText>
        <span>{tooltipMessage}</span> <br />
        {DEFAULT_MESSAGE_END_QUESTION_INPUT_TOOLTIP}
      </Styled.SubmitTooltipText>
    );

  const getQuestionLength = question => deleteNoMarkupFormatHTML(question.trim()).length;

  const onAnonymousChange = (event) => {
    setState({
      ...state,
      isAnonymous: event.target.checked,
    });
  };

  const { tooltipMessage, askButtonEnabled } = isAllowedToSubmitQuestion();
  const { askButtonClass, locationDropdownClass } =
      getClasses(askButtonEnabled, state.assignedDepartment.department_id);

  if (navigate) {
    return <Navigate to={navigate} />;
  }

  return (
    <Styled.InputForm className="clearfix">
      <form onSubmit={onSubmit} id="question-submit-form">
        <Styled.InputContainer >
          <Styled.InputTopWrapper>
            <InputAuthor
              dropDownTitle={state.dropDownTitle}
              profilePicture={state.profilePicture}
              selectPostingAs={selectPostingAs}
              isAsking
              isAnonymous={state.isAnonymous}
            />
            <RiArrowRightSFill color="black" size={'25px'} />
            <Styled.Options
              department={state.assignedDepartment.name}
              location={state.fullLocation}
            >
              <QuestionAssigner
                department={state.assignedDepartment}
                onSelectDepartment={handleDepartmentSelectChange}
                departments={departments}
              />
              <QuestionLocation
                onSelectLocation={onLocationChange}
                location={state.fullLocation}
                locations={locations}
                className={locationDropdownClass}
              />
            </Styled.Options>
          </Styled.InputTopWrapper>
          {/* <QuestionInputText
            inputValue={state.inputValue}
            ref={setQuestionInputTextRef}
            editorState={editorState}
            setEditorState={setEditorState}
            onInputChange={onInputChange}
            submitElement={
              <Styled.Submit disabled={askButtonClass}>
                <p style={{ float: 'left' }}>
                  <span>Ask anonymously</span>
                  <Switch
                    checked={state.isAnonymous}
                    onChange={onAnonymousChange}
                  />
                </p>
                <InputCounter
                  currentLength={getQuestionLength(state.inputValue)}
                  maxLength={MAXIMUM_QUESTION_LENGTH}
                />
                <Styled.SubmitTooltip
                  type="submit"
                  id="submit-btn"
                  disabled={!askButtonEnabled}
                >
                  {renderTooltip(tooltipMessage)}
                  Ask
                </Styled.SubmitTooltip>
              </Styled.Submit>
            }
          /> */}
        </Styled.InputContainer>
        <SubmitWithModal
          show={state.showSubmitWithModal}
          onClose={onSubmitWithModalClose}
          onSubmitSuccess={onSubmitWithModalSuccess}
          warnings={state.warnings}
          isAnonymous={state.isAnonymous}
        />
        <br />
      </form>
    </Styled.InputForm>
  );
}

QuestionForm.propTypes = {
  postQuestion: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    name: PropTypes.string,
    picture: PropTypes.string,
  }),
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  departments: PropTypes.array,
  initialValue: PropTypes.string,
  initialDepartment: PropTypes.shape({
    name: PropTypes.string.isRequired,
    department_id: PropTypes.number.isRequired,
  }),
  initialIsAnonymous: PropTypes.bool,
};

QuestionForm.defaultProps = {
  profile: {
    name: '',
    picture: '',
  },
  initialValue: '',
  initialDepartment: { name: '', department_id: NO_DEPARTMENT_SELECTED_ID },
  initialIsAnonymous: false,
};

export default QuestionForm;
