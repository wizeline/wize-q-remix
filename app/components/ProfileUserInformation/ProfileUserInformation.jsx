/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import useUser from 'app/utils/hooks/useUser';
import * as Styled from 'app/components/ProfileUserInformation/ProfileUserInformations.Styled';
import QuestionTable from '../QuestionTable/QuestionTable';

function ProfileUserInformation(props) {
  const { questions, questionCommented, questionsAnswered } = props;

  const profile = useUser();
  const initialState = {
    profilePicture: profile.profile_picture,
  };

  return (
    <>
      <Styled.BlueBar>

        <Styled.ProfileName>
          {profile.full_name}
        </Styled.ProfileName>

      </Styled.BlueBar>

      <Styled.WhiteBar>
        <Styled.ImgContainer>
          <Styled.UserImg
            src={initialState.profilePicture}
            alt="profile"
            picture={initialState.profilePicture}
          />
        </Styled.ImgContainer>

        <Styled.ContainerMetrics>

          <Styled.Metrics>
            {questions.length}
            <Styled.LabelMetrics>Questions</Styled.LabelMetrics>
          </Styled.Metrics>

          <Styled.Metrics>
            {questionCommented.length}
            <Styled.LabelMetrics>Commented Questions</Styled.LabelMetrics>
          </Styled.Metrics>

          {profile.is_admin && (
          <Styled.Metrics>
            {questionsAnswered.length}
            <Styled.LabelMetrics>Questions answered</Styled.LabelMetrics>
          </Styled.Metrics>
          )}

        </Styled.ContainerMetrics>
      </Styled.WhiteBar>

      <div style={{
        backgroundColor: '#F4F7F9', height: 'auto', width: '100%', display: 'flex',
      }}
      >
        <div style={{ flex: '0.2' }} />
        <div style={{ flex: '2' }}>
          <div style={{ margin: '15px' }}>
            <div>
              <QuestionTable questions={questions} title="Questions" />
            </div>
          </div>

          <div style={{ margin: '15px' }}>
            <div>
              {questionCommented.length > 0
                 && <QuestionTable questions={questionCommented} title="Questions Commented" />}
            </div>
          </div>

          <div style={{ margin: '15px' }}>
            <div>
              {questionsAnswered.length > 0 && profile.is_admin && <QuestionTable questions={questionsAnswered} title="Questions Answered" />}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

ProfileUserInformation.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape()),
  questionCommented: PropTypes.arrayOf(PropTypes.shape()),
  questionsAnswered: PropTypes.arrayOf(PropTypes.shape()),
};

ProfileUserInformation.defaultProps = {
  questions: [],
  questionCommented: [],
  questionsAnswered: [],
};

export default ProfileUserInformation;
