import React, { Component } from 'react';
import { FOOTER_MESSAGE } from '~/utils/constants';
import * as Styled from '~/styles/Contact.Styled';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wizeQTeamUrl: 'https://wizeline.atlassian.net/wiki/spaces/WIZEQ/overview',
    };
  }

  render() {
    return (
      <Styled.FooterDiv>
        <Styled.FooterContainer>
          <Styled.FooterLink href={this.state.wizeQTeamUrl} target="_blank" rel="noopener noreferrer">
            {FOOTER_MESSAGE}
          </Styled.FooterLink>
        </Styled.FooterContainer>
      </Styled.FooterDiv>
    );
  }
}

export default Footer;