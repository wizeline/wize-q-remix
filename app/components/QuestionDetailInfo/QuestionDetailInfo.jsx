import React from 'react';
import PropTypes from 'prop-types';
import { useLoaderData } from '@remix-run/react';
import { renderDepartment } from 'app/utils/questionUtils';
import Label from 'app/components/Atoms/Label';
import * as Styled from 'app/components/QuestionDetailInfo/QuestionDetailInfo.Styled';
import { NOT_ASSIGNED_DEPARTMENT_ID } from 'app/utils/constants';

function QuestionDetailInfo({ location, department, employeeName }) {
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
          department && department.department_id !== NOT_ASSIGNED_DEPARTMENT_ID
            ? <Label text={renderDepartment(department)} type="Department" />
            : <Styled.NotAssigned>Not Assigned</Styled.NotAssigned>
        }
      </Styled.QuestionDetailInfoSection>
      {employeeName && (
      <Styled.QuestionDetailInfoSection>
        <Styled.QuestionDetailInfoTitle>Assigned to</Styled.QuestionDetailInfoTitle>
        <Label text={employeeName} type="Employee" />
      </Styled.QuestionDetailInfoSection>
      )}
    </Styled.QuestionDetailInfoContainer>
  );
}

QuestionDetailInfo.propTypes = {
  location: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  employeeName: PropTypes.string.isRequired,
};

export default QuestionDetailInfo;
