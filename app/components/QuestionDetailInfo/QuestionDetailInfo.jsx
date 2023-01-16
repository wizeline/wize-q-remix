import React from 'react';
import PropTypes from 'prop-types';
import { useLoaderData } from '@remix-run/react';
import { renderDepartment } from 'app/utils/questionUtils';
import Label from 'app/components/Atoms/Label';
import * as Styled from './QuestionDetailInfo.Styled';

function QuestionDetailInfo({ location, department }) {
  const { locations } = useLoaderData();

  const renderLocation = (_location, _locations) => {
    if (_locations.length === 0) {
      return '...';
    }

    return _locations.find((loc) => loc.code === location).name;
  };

  return (
    <Styled.QuestionDetailInfoContainer>
      <Styled.QuestionDetailInfoSection>
        <Styled.QuestionDetailInfoTitle>Location</Styled.QuestionDetailInfoTitle>
        <Label text={renderLocation(location, locations)} type="Location" />
      </Styled.QuestionDetailInfoSection>
      <Styled.QuestionDetailInfoSection>
        <Styled.QuestionDetailInfoTitle>Department</Styled.QuestionDetailInfoTitle>
        {
          department
            ? <Label text={renderDepartment(department)} type="Department" />
            : <Styled.NotAssigned>Not Assinged</Styled.NotAssigned>
        }
      </Styled.QuestionDetailInfoSection>
    </Styled.QuestionDetailInfoContainer>
  );
}

QuestionDetailInfo.propTypes = {
  location: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
};

export default QuestionDetailInfo;
