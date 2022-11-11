import PropTypes from 'prop-types';
import { useLoaderData } from '@remix-run/react';
import { renderDepartment } from '~/utils/questionUtils';
import Label from "~/components/Atoms/Label";
import * as Styled from './QuestionDetailInfo.Styled';

const QuestionDetailInfo = ({ location, department }) => {

  const { locations } = useLoaderData();

  const renderLocation = (location, locations) => {
    if (locations.length === 0) {
      return '...';
    }
  
    return locations.find(loc => loc.code === location).name;
  };

  return (
    <Styled.QuestionDetailInfoContainer>
      <Styled.QuestionDetailInfoSection>
        <Styled.QuestionDetailInfoTitle>Location</Styled.QuestionDetailInfoTitle>
        <Label text={renderLocation(location, locations)} type={'Location'}/>
      </Styled.QuestionDetailInfoSection>
      <Styled.QuestionDetailInfoSection>
        <Styled.QuestionDetailInfoTitle>Department</Styled.QuestionDetailInfoTitle>
        {
          department ? 
          <Label text={renderDepartment(department)} type={'Department'}/> :
          <Styled.NotAssigned>Not Assinged</Styled.NotAssigned>
        }
      </Styled.QuestionDetailInfoSection>
    </Styled.QuestionDetailInfoContainer>
  )
}

QuestionDetailInfo.propTypes = { 
  location: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
};


export default QuestionDetailInfo;