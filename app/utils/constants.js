// export const API_ENDPOINT = process.env.REACT_APP_API_URL;

// // Enable / Disable .env params per feature
// export const SOCKETS_FEATURE_ENABLED = (process.env.REACT_APP_SOCKETS === 'ON');
// export const SHARE_DROPDOWN_ENABLED = (process.env.REACT_APP_SHARE_DROPDOWN === 'true');

// Database string limit constant. It should hold about one page worth of text.
export const MAXIMUM_ANSWER_LENGTH = 3000;
export const MAXIMUM_COMMENT_LENGTH = 3000;
export const MAXIMUM_QUESTION_LENGTH = 500;
export const MINIMUM_QUESTION_LENGTH = 14;
export const MINIMUM_ANSWER_LENGTH = 14;

// limit input in contact form
export const MAXIMUM_MESSAGE_LENGTH = 3000;
export const MAXIUMUM_EMAIL_LENGTH = 320;
export const MAXIMUM_NAME_LENGTH = 50;
// reason length is a constant with a direct relationship to CONTACT_REASONS_LIST attribute value.
export const MAXIMUM_REASON_LENGTH = 7;

export const QUESTION_LENGHT_RESTRICTIONS = `Question must be between ${MINIMUM_QUESTION_LENGTH} and ${MAXIMUM_QUESTION_LENGTH} characters`;
// warnings
export const answerDeleteWarning = (questionId) => `You're about to delete the answer to question Q${questionId}`;
export const ANSWER_DELETE_WARNING_SUBTITLE = 'Do you want to continue?';
export const ANONYMOUS_SWITCH_WARNING = 'You are about to change the privacy to anonymous, after logging out, your question will not be editable anymore';
export const IDENTITY_MESSAGE = 'You are about to post a question';
export const CONTINUE_MESSAGE = 'Do you want to continue?';
export const CONTACT_WARNING = 'Please enter all fields';
export const HTML_CODE_WARNING = 'Your input contains some HTML code without the correct Markdown format, so it will be removed if submitted. If you want to keep the HTML code please encapsulate it like `<html>markup</html>`';

export const PAGE_QUESTIONS_LIMIT = 20;
export const PAGE_COMMENTS_LIMIT = 100;
export const FIRST_PAGE_NUMBER = 1;
export const DEFAULT_ACCESS_VALUE = 'value';
export const DEFAULT_LOCATION_ACCESS_VALUE = 'code';

export const SORTING_OPTIONS = [
  { name: 'Newest', value: 'newest' },
  { name: 'Oldest', value: 'oldest' },
  { name: 'Popular', value: 'popular' },
  { name: 'Most Commented', value: 'most_commented' },
];

export const DEFAULT_SORTING_OPT = SORTING_OPTIONS[0];
export const SORTING_ACCESS_VALUE = DEFAULT_ACCESS_VALUE;

export const DATE_RANGE_OPTIONS = [
  { name: 'All', value: 'all' },
  { name: 'Today', value: 'today' },
  { name: 'This week', value: 'this_week' },
  { name: 'This month', value: 'this_month' },
];

export const DATE_RANGE_LABEL = 'Date range';
export const DEFAULT_DATE_RANGE_OPT = DATE_RANGE_OPTIONS[0];
export const DATE_RANGE_ACCESS_VALUE = DEFAULT_ACCESS_VALUE;

export const STATUS_OPTIONS = [
  { name: 'All', value: 'all' },
  { name: 'Answered', value: 'answered' },
  { name: 'Not Answered', value: 'not_answered' },
];

export const STATUS_LABEL = 'Status';
export const DEFAULT_STATUS_OPT = STATUS_OPTIONS[0];
export const STATUS_ACCESS_VALUE = DEFAULT_ACCESS_VALUE;

export const DEPARTMENT_OPTIONS = [
  { department_id: -1, name: 'All' },
];

export const DEPARTMENT_LABEL = 'Department';
export const DEFAULT_DEPARTMENT_OPT = DEPARTMENT_OPTIONS[0];
export const DEFAULT_DEPARTMENT_ID = DEFAULT_DEPARTMENT_OPT.department_id;
export const DEPARTMENT_ACCESS_VALUE = 'department_id';

export const LOCATION_LABEL = 'Location';
export const DEFAULT_LOCATION = 'ALL';
export const LOCATION_ACCESS_VALUE = DEFAULT_LOCATION_ACCESS_VALUE;
export const DEFAULT_LOCATION_OPT = { name: 'All', code: DEFAULT_LOCATION };

export const FILTER_BY_USER_TEXT = 'All questions';
export const DEFAULT_FILTER_BY_USER = 'ALL_QUESTIONS';

export const FILTER_BY_USER_TYPES = [
  { name: 'All questions', value: DEFAULT_FILTER_BY_USER },
  { name: 'Assigned to me', value: 'MY_QUESTIONS' },
];

export const DEFAULT_QUESTION_SEARCH = {
  type: 'pending',
  order: 'newest',
  dateRange: 'all',
  status: 'all',
  offset: 0,
  limit: PAGE_QUESTIONS_LIMIT,
  search: '',
  location: DEFAULT_LOCATION,
  filterByUser: false,
  tag: '',
};

export const DEFAULT_COMMENT_SEARCH = {
  offset: 0,
  limit: PAGE_COMMENTS_LIMIT,
};

export const DEFAULT_QUESTION_COMMENT_SORTING = 'votes';
export const ACTIVITY_TIME_QUESTION_COMMENT_SORTING = 'activityTime';

export const ENDPOINT_DASHBOARD = '/api/dashboard';
export const ENDPOINT_QUESTIONS = '/api/questions';
export const ENDPOINT_ANSWERS = '/api/answers';
export const ENDPOINT_COMMENTS = '/api/comments';
export const ENDPOINT_COMMIT_HASH = '/api/commit_hash';
export const ENDPOINT_EMPLOYEES = '/api/employees';
export const ENDPOINT_DEPARTMENTS = '/api/departments';
export const ENDPOINT_VOTE = '/api/vote';
export const ENDPOINT_CONTACT = '/api/contact';
export const ENDPOINT_LOCATIONS = '/api/locations';

export const ANONYMOUS_USER = {
  username: 'Anonymous',
  profilePicture: '/anonymous.png',
};

export const ALERT_SUCCESS = 'success';
export const ALERT_DANGER = 'danger';
export const ALERT_WARNING = 'warning';

export const ALERT_SUCCESS_TITLE = 'Success';
export const ALERT_ERROR_TITLE = 'Error';
export const ALERT_WARNING_TITLE = 'Warning:';

// Define APP URL constant, default STG environment URL
// export const REACT_APP_URL = process.env.REACT_APP_URL ? process.env.REACT_APP_URL : 'https://questions-stage.wizeline.com';

export const ANSWER_UPDATED = 'Answer successfully updated';
export const ANSWER_DELETED = 'Answer successfully deleted';
export const ANSWER_LENGTH_EXCEEDED = `The maximum length is ${MAXIMUM_ANSWER_LENGTH} characters`;
export const ANSWER_EMPTY = 'No empty answers are allowed';
export const SHOW_MORE_TEXT = 'Show more';
export const SHOW_LESS_TEXT = 'Show less';
export const COLLAPSED_QUESTION_MIN_LENGTH = 130;
export const COLLAPSED_ANSWER_MIN_LENGTH = 130;
export const COLLAPSED_COMMENT_MIN_LENGTH = COLLAPSED_ANSWER_MIN_LENGTH;

export const MAX_DAYS_RANGE_CSV_EXPORT = 89;
export const EXPORT_CSV_FORM_DATE_FORMAT = 'YYYY-MM-DD';

// Departments
export const DEPARTMENT_NOT_ASSIGNED = 'Not Assigned';

// Questions
export const FOLLOW = 'Follow';
export const VOTE_TIME_CHECK = 1500;

// Comments
export const COMMENT_CONFIRM_DELETE = 'Are you sure you want to delete this comment?';
export const NO_COMMENTS = 'No Comments';
export const NO_COMMENTS_MESSAGE = 'You can be the first to comment on this question.';
export const COMMENT = 'Comment';
export const COMMENTS = 'Comments';
export const WARNING_MAX_COMMENT_LENGTH = 'The maximum length is 3000 characters';
export const WARNING_EMPTY_COMMENT_SUBMIT = 'Comment needed to Post';
export const COMMENTS_SEPARATOR = ' | ';
export const COMMUNITY_ANSWER_COMMENT_VOTES_THRESHOLD = 10;
export const COMMUNITY_ANSWER_TAG_TEXT = 'Community answer';

// Contacts
export const CONTACT_REASONS_LIST = [
  { value: 'default', reason: 'I want to' },
  { value: 'bug', reason: 'Report a bug' },
  { value: 'feature', reason: 'Suggest new feature' },
  { value: 'join', reason: 'Join the WizeQ team' },
  { value: 'vibes', reason: 'Send Good Vibes!' },
];

export const CONTACT_REASONS_MAP = {
  default: 'I want to',
  bug: 'Report a bug',
  feature: 'Suggest a new feature',
  join: 'Join the WizeQ team',
  vibes: 'Send Good Vibes!',
};

// email
export const EMAIL_CONTACT_FORMAT = {
  address: 'wizeq@wizeline.com',
  subject: 'New WizeQ Contact Entry',
  content: 'Default',
};

// footer
export const FOOTER_MESSAGE = 'Proudly powered by Wizeline new hires as part of their technical on-boarding process';

export const TOKEN_ID_SEPARATOR = ':';

// Answer question
export const ANSWER_PLACE_HOLDER = 'Type your answer here...';
export const MINIMUM_INPUT_LENGTH_TO_SHOW_MARKDOWN = 2;
export const MINIMUM_WIDTH_TO_SHOW_MARKDOWN = 767;
export const MINIMUN_WINDOW_WIDTH = 768;
export const editAnswerMessage = (questionId) => `Edit answer to question Q${questionId}?`;
export const editAnswerInfo = (fullName, timeDiff) => `Question answered by ${fullName}, ${timeDiff}`;
export const addAnswerInfo = (fullName, timeDiff) => `Question asked by ${fullName}, ${timeDiff}`;
export const addAnswerMessage = (questionId) => `Do you have the answer to question Q${questionId}?`;

// Buttons
export const CANCEL = 'Cancel';
export const SUBMIT = 'Submit';
export const DELETE_ANSWER = 'Delete Answer';
export const SUBMIT_ANSWER = 'Submit Answer';
export const UPDATE_ANSWER = 'Update Answer';

export const ANSWER = 'ANSWER';
export const ASSIGN = 'ASSIGN';
export const REASSIGN = 'REASSIGN';

export const HIGHLIGHT_START = 'HIGHLIGHT_START_INDICATOR';
export const HIGHLIGHT_END = 'HIGHLIGHT_END_INDICATOR';

// Input
export const inputPlaceholder = (minCharacters) => `Type at least ${minCharacters} characters`;

// textarea
export const MIN_TEXTAREA_ROWS = 1;
export const TEXTAREA_LINE_HEIGHT_IN_PX = 13;
export const MIN_COMMENT_PREVIEW_LENGTH = 3;
export const MIN_SHOW_COMMENT_BTN_LENGTH = 2;
export const MAX_COMMENT_LENGTH = 500;
export const COMMENT_INPUT_PLACEHOLDER = 'Add a comment and remember, we are all nice Wizeline collaborators.';
export const COMMENT_EDIT_PLACEHOLDER = "Your comment can't be empty";

// Loader
export const LSPIN_SMALL = 'SMALL';
export const LSPIN_MEDIUM = 'MEDIUM';
export const LSPIN_LARGE = 'LARGE';

// Net Promoter Score
export const SCORES = [
  { name: 'Strongly Disagree', value: 1 },
  { name: 'Disagree', value: 2 },
  { name: 'Agree', value: 3 },
  { name: 'Strongly Agree', value: 4 },
];
export const DISPLAY_TEXT_BEFORE_SCORING = 'Do you consider the answer solves the question?';
export const DISPLAY_TEXT_AFTER_SCORING = 'Thanks for your feedback!';
export const UNDO_BUTTON_TEXT = 'Undo';
export const AFTER_SCORE_TIMEOUT = 800;

// Sockets
export const SOCKET_CREATE_COMMENT = 'create_comment';
export const SOCKET_UPDATE_COMMENT = 'update_comment';
export const SOCKET_DELETE_COMMENT = 'delete_comment';
export const SOCKET_UPVOTE = 'upvoted';
export const SOCKET_DELETE_VOTE = 'deleted vote';

// Tooltips
export const DISABLED_ANSWER_ICONS_TOOLTIP_MESSAGE = 'You can not modify an already scored answer';
export const NO_DEPARTMENT_SELECTED_TOOLTIP_MESSAGE = 'Select a department';
export const NO_COLLABORATOR_SELECTED_TOOLTIP_MESSAGE = 'Select a collaborator';
export const MIN_CHARS_QUESTION_INPUT_TOOLTIP_MESSAGE = inputPlaceholder(MINIMUM_QUESTION_LENGTH);
export const DEFAULT_MESSAGE_END_QUESTION_INPUT_TOOLTIP = 'to ask a question.';
export const NO_LOCATIONS_AVAILABLE_TOOLTIP_MESSAGE = 'There are no locations';
export const SHOW_ONLY_OFFICIAL_ANSWER = '"Answered" option filters only admins answers (official and comment approved)';

// Sockets & Reactivity
export const FAKE_SOCKET = {
  on: () => { },
  emit: () => { },
  close: () => { },
}; // used instead of an actual socket when reactivity is disabled

// Back to top
export const BACK_TO_TOP = 'Back to top';

// Question Text area Defaults
export const LINE_HEIGHT_IN_PX = 23;
export const NONE_LOCATION = 'NONE';
export const MIN_QUESTION_PREVIEW_LENGTH = 13;

// Question Text area Warnings
export const QUESTION_BEING_PROCESSED = 'Your question is being processed';
export const DEPARTMENT_WARNING = 'You need to select a department';
export const EMPLOYEE_WARNING = 'You need to select a collaborator';
export const DEFAULT_LOCATION_MESSAGE = 'As you have not selected a location for your question, it will be posted to all locations.';
export const ALL_LOCATIONS_MESSAGE = 'This question will be posted to all locations. Are you sure?';
export const LOCATION_WARNING = 'This question will be posted to: ';
export const EMPLOYEE_PLACEHOLDER = 'Select a collaborator';
export const DEPARTMENT_PLACEHOLDER = 'Select a department';
export const NO_DEPARTMENT_SELECTED_ID = -1;
export const NO_EMPLOYEE_SELECTED_ID = -1;
export const NOT_ASSIGNED_DEPARTMENT_ID = 1;

// Buttons Categories
export const PRIMARY_BUTTON = 'primary_button';
export const SECONDARY_BUTTON = 'secondary_button';
export const DISABLED_BUTTON = 'disabled_button';
export const DANGER_BUTTON = 'danger_button';
export const TEXT_BUTTON = 'text_button';
export const CLOSE_BUTTON = 'close_button';
export const ICON_BUTTON = 'icon_button';

export const DEFAULT_TOAST_CONFIG = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// Things to Keep in Mind
export const RECOMMENDATIONS_QUESTION = [
  'Strive for constructive open communication. Avoid vagueness.',
  'Do not demean or degrade others because of their gender, race, age, religion, etc.',
  'Avoid posting questions that include sexually explicit comments, hate speech, prejudicial remarks, and profanity.',
  'Do not mock other members, their comments, profiles, threads, or experiences. Remember, what is funny for you may be offensive to others.',
];

// Recurring error messages
export const PIN_QUESTION_ERROR_MESSAGE = 'Error trying to pin/unpin the question.';
export const INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE = 'The provided parameters for the operation are not valid';
export const QUESTION_NOT_FOUND_ERROR_MESSAGE = 'The question with the id provided could not be found';
export const INVALIDATE_VOTE_ERROR_MESSAGE = 'Error trying to invalidate the vote in the question';
export const UPDATE_COMMENT_ERROR_MESSAGE = 'Error trying to update the comment';
export const DELETE_COMMENT_ERROR_MESSAGE = 'Error trying to delete the comment';
export const ENABLE_DISABLE_ERROR_MESSAGE = 'Error trying to enable/disable this question';
export const PUBLISH_QUESTION_ERROR_MESSAGE = 'Error trying to publish the question.';

// Database string limit constant. It should hold about one page worth of text.
export const MINIMUM_COMMENT_LENGTH = 2;
export const DATE_FORMAT = 'MM-DD-YYYY';
export const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ';
export const BASE_NUMBER = 10;
export const NOTIFICATION_MINUTE_INTERVAL = 3;
export const MAXIMUM_QUESTION_EXPORT_CSV_DAYS_RANGE = 90;
export const MAXIMUM_QUESTION_EXPORT_CSV_MONTHS_RANGE = 3;
export const DEFAULT_LIMIT = 20;
export const DEFAULT_OFFSET = 0;
export const MIN_NET_PROMOTER_SCORE = 1;
export const MAX_NET_PROMOTER_SCORE = 4;
export const DEFAULT_ERROR_MESSAGE = 'An unknown error has occurred with your request.';
export const COMMENT_AS_AN_ANSWER = 'This question already has a comment as answer';
export const DEFAULT_MONTHS = -3;
export const DEFAULT_TAGS_LIMIT = 5;

// OPENAI
export const EMBEDDINGS_MODEL = 'text-embedding-ada-002';
