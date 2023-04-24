/* eslint-disable camelcase */
/* eslint-disable no-useless-catch */
import React, { useState, useEffect } from 'react';
import { useFetcher } from '@remix-run/react';
import PropTypes from 'prop-types';
import { ContentState, convertFromRaw, EditorState } from 'draft-js';
import { markdownToDraft } from 'markdown-draft-js';
import { RiArrowRightSFill } from 'react-icons/ri';
import { requireEmployeeAssigned } from 'app/config/flags.json';

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
  NO_EMPLOYEE_SELECTED_ID,
  NO_COLLABORATOR_SELECTED_TOOLTIP_MESSAGE,
} from 'app/utils/constants';
import * as Styled from 'app/components/QuestionForm/QuestionForm.Styled';
import Switch from 'app/components/Switch';
import InputAuthor from 'app/components/InputAuthor';
import InputCounter from 'app/components/InputCounter';
import SubmitWithModal from 'app/components/SubmitWithModal';
import { deleteNoMarkupFormatHTML } from 'app/utils/stringOperations';
import { validTextLength } from 'app/utils/input';
import QuestionInputText from 'app/components/QuestionInputText';
import useUser from 'app/utils/hooks/useUser';
import DropdownMenu from 'app/components/DropdownMenu';

function QuestionForm({
  postQuestion,
  locations,
  departments,
  initialValue,
  initialDepartment,
  initialIsAnonymous,
}) {
  const { full_name, picture } = useUser();
  const fetcher = useFetcher();
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
    askBtbEnabled: false,
    assignedEmployee: undefined,
    employeesByDepartment: [],
  };

  const [state, setState] = useState(initialState);
  const [editorState, setEditorState] = useState(
    () => EditorState.createWithContent(convertFromRaw(markdownToDraft(state.inputValue))),
  );

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
    const fetchEmployees = async () => {
      if (state.assignedDepartment.department_id !== -1) {
        fetcher.load(`/employees/getByDeparment/${state.assignedDepartment.department_id}`);

        setState({
          ...state,
          assignedEmployee: undefined,
        });
      }
    };
    fetchEmployees();
  }, [state.assignedDepartment]);

  useEffect(() => {
    setState({
      ...state,
      employeesByDepartment: (fetcher.data !== undefined && fetcher.data.employees !== undefined)
        ? fetcher.data.employees : [],
    });
  }, [fetcher.data]);

  useEffect(() => {
    selectPostingAs(full_name);
  }, [full_name]);

  const clearTextArea = () => {
    setEditorState(() => EditorState.push(editorState, ContentState.createFromText(''), 'remove-range'));
  };

  const onSubmitWithModalSuccess = async () => {
    const {
      location, isAnonymous, inputValue, assignedDepartment,
    } = state;
    setState({ ...state, showSubmitWithModal: false });
    const question = {
      isAnonymous,
      question: deleteNoMarkupFormatHTML(inputValue.trim()),
      location: location === NONE_LOCATION ? DEFAULT_LOCATION : location,
      assignedDepartment: assignedDepartment.department_id || 'wizeq',
      assigned_to_employee_id: state.assignedEmployee ? state.assignedEmployee.id : undefined,
    };

    try {
      await postQuestion(question);
      setState(initialState);
      clearTextArea();
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
        (loc) => loc.code === location,
      );
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
      location: selectedLocation.code,
      fullLocation: locations.find(
        (loc) => loc.code === selectedLocation.code,
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

  const getClasses = (askBtbEnabled, departmentId) => {
    // eslint-disable-next-line no-unneeded-ternary
    const askBtnClass = askBtbEnabled ? false : true;
    const employeeDropdownClass = (departmentId !== NOT_ASSIGNED_DEPARTMENT_ID
      && departmentId !== NO_DEPARTMENT_SELECTED_ID) ? '' : 'employee-dropdown--department-assigned';
    const locationDropdownClass = departmentId !== NO_DEPARTMENT_SELECTED_ID
      ? '' : 'location-dropdown--department-selected';
    return {
      askBtnClass,
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

  const selectEmployeeHandler = (selectedEmployee) => {
    setState({
      ...state,
      assignedEmployee: selectedEmployee,
    });
  };

  const isAllowedToSubmitQuestion = () => {
    const {
      assignedDepartment,
      inputValue,
      assignedEmployee,
    } = state;

    const sanitizedInput = deleteNoMarkupFormatHTML(inputValue.trim());

    let askBtbEnabled = true;
    let tooltipMessage = '';
    if (!validTextLength(sanitizedInput.length, MINIMUM_QUESTION_LENGTH, MAXIMUM_QUESTION_LENGTH)) {
      askBtbEnabled = false;
      tooltipMessage = MIN_CHARS_QUESTION_INPUT_TOOLTIP_MESSAGE;
    }

    if (assignedDepartment.department_id === NO_DEPARTMENT_SELECTED_ID) {
      askBtbEnabled = false;
      tooltipMessage = NO_DEPARTMENT_SELECTED_TOOLTIP_MESSAGE;
    }

    if (requireEmployeeAssigned && !assignedEmployee) {
      askBtbEnabled = false;
      tooltipMessage = NO_COLLABORATOR_SELECTED_TOOLTIP_MESSAGE;
    }

    if (locations.length === 0) {
      askBtbEnabled = false;
      tooltipMessage = NO_LOCATIONS_AVAILABLE_TOOLTIP_MESSAGE;
    }

    return {
      askBtbEnabled,
      tooltipMessage,
    };
  };

  const renderTooltip = (tooltipMessage) => tooltipMessage && (
    <Styled.SubmitTooltipText>
      <span>{tooltipMessage}</span>
      {' '}
      <br />
      {DEFAULT_MESSAGE_END_QUESTION_INPUT_TOOLTIP}
    </Styled.SubmitTooltipText>
  );

  const getQuestionLength = (question) => deleteNoMarkupFormatHTML(question.trim()).length;

  const onAnonymousChange = (event) => {
    setState({
      ...state,
      isAnonymous: event.target.checked,
    });
  };

  const { tooltipMessage, askBtbEnabled } = isAllowedToSubmitQuestion();
  const { askBtnClass } = getClasses(
    askBtbEnabled,
    state.assignedDepartment.department_id,
  );

  const renderEmployeeAssignedDropdown = () => requireEmployeeAssigned
    && state.assignedDepartment.department_id !== -1
      && <DropdownMenu name="People" type="People" handler={selectEmployeeHandler} selectedOption={null} options={state.employeesByDepartment} />;

  return (
    <Styled.InputForm className="clearfix">
      <form onSubmit={onSubmit} id="question-submit-form">
        <Styled.InputContainer>
          <Styled.InputTopWrapper>
            <InputAuthor
              dropDownTitle={state.dropDownTitle}
              profilePicture={state.profilePicture}
              selectPostingAs={selectPostingAs}
              isAsking
              isAnonymous={state.isAnonymous}
            />
            <RiArrowRightSFill color="black" size="25px" />
            <Styled.Options
              department={state.assignedDepartment.name}
              location={state.fullLocation}
            >
              <DropdownMenu name="Deparment" type="Build" handler={handleDepartmentSelectChange} selectedOption={null} options={departments} />
              { renderEmployeeAssignedDropdown() }
              <DropdownMenu name="Location" type="Location" handler={onLocationChange} selectedOption={null} options={locations} />
            </Styled.Options>
          </Styled.InputTopWrapper>
          <QuestionInputText
            inputValue={state.inputValue}
            editorState={editorState}
            setEditorState={setEditorState}
            onInputChange={onInputChange}
            submitElement={(
              <Styled.Submit disabled={askBtnClass}>
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
                  disabled={!askBtbEnabled}
                >
                  {renderTooltip(tooltipMessage)}
                  Ask
                </Styled.SubmitTooltip>
              </Styled.Submit>
            )}
          />
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
  departments: PropTypes.arrayOf(
    PropTypes.shape(),
  ),
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
  departments: [],
  initialDepartment: { name: '', department_id: NO_DEPARTMENT_SELECTED_ID },
  initialIsAnonymous: false,
};

export default QuestionForm;
