import * as Styled from '~/styles/About.Styled';
import meetingIcon from '~/images/ic_meeting.svg';
import savingFundIcon from '~/images/ic_saving_fund.svg';
import dialogueIcon from '~/images/ic_dialogue.svg';
import anonymousIcon from '~/images/ic_anonymous.svg';

const About = () => (
  <Styled.About>
    <Styled.AboutBody>
      <h1>About Us</h1>
      <h2>This is Wizeline Questions</h2>
      <p><strong>Wizeline Questions (WizeQ)</strong> is a communication space where you
        can express your ideas, learn more about Wizeline, and ask all kinds of
        questions. </p>
      <p>Wizeline Questions is a knowledge base where you can ask for information
        to a specific department and allow other Wizeliners to benefit from it. For
        example:</p>


      <Styled.BoxWrapper>
        <Styled.BoxContainer>
          <Styled.BoxImageContainer>
            <Styled.BoxImage src={meetingIcon} />
            <Styled.BoxBoldText>
              Are you still having problems with Zoom for your next meeting?
            </Styled.BoxBoldText>
          </Styled.BoxImageContainer>
          <Styled.BoxMetadata>
            Check Wizeline Questions, someone might have already asked IT the same
            question. If that is not the case, this is your chance to shine!
          </Styled.BoxMetadata>
        </Styled.BoxContainer>
        <Styled.BoxContainer>
          <Styled.BoxImageContainer>
            <Styled.BoxImage src={savingFundIcon} />
            <Styled.BoxBoldText>
              Do you want to know more about the savings fund?
            </Styled.BoxBoldText>
          </Styled.BoxImageContainer>
          <Styled.BoxMetadata>
            Tag People Ops in your question, other Wizeliners will be glad to
            learn about that same topic, for sure!
          </Styled.BoxMetadata>
        </Styled.BoxContainer>
      </Styled.BoxWrapper>
      <Styled.AboutMetadata>
        <p>
          Information can be easily lost in the flood of comments and pinged posts on
          Slack. Do you need information to persist? <strong>Use Wizeline
            Questions instead!</strong>
        </p>
      </Styled.AboutMetadata>
      <h3>What else?</h3>
      <Styled.AboutWhatElseContainer>
        <Styled.AboutWhatElseImg src={dialogueIcon} />
        <Styled.AboutWHatElseText>
          <Styled.AboutWHatElseBold>
            Start a conversation. Is there a topic you want to discuss with
            other Wizeliners?
          </Styled.AboutWHatElseBold>
          <Styled.AboutWhatElseMetadata>
            This is the place!. You can reply to a question and
            also hold interesting conversations with other Wizeliners.  Use it as a
            discussion forum, suggestion what-else, or simply visit to say hello! Help us
            to keep Wizeline an amazing place!
          </Styled.AboutWhatElseMetadata>
        </Styled.AboutWHatElseText>
      </Styled.AboutWhatElseContainer>
      <Styled.AboutWhatElseContainer>
        <Styled.AboutWhatElseImg src={anonymousIcon} />
        <Styled.AboutWHatElseText>
          <Styled.AboutWHatElseBold>
            Is there a sensitive question you want to ask anonymously?
          </Styled.AboutWHatElseBold>
          <Styled.AboutWhatElseMetadata>
            Ask on Wizeline Questions! To promote ownership and open communication,
            it displays your user name by default when you post a new question.
            But you can always opt for anonymity.
          </Styled.AboutWhatElseMetadata>
        </Styled.AboutWHatElseText>
      </Styled.AboutWhatElseContainer>

      <h3>Things to Keep in Mind When Asking a Question</h3>
      <p>
        We value your ideas, questions, suggestions, and comments. Therefore, we
        encourage you to use this communication space. Please, when writing a new
        question or a comment follow these recommendations:
        <ul>
          <li>
            Strive for constructive open communication. Avoid vagueness.
          </li>
          <li>
            Do not demean or degrade others because of their gender, race, age, religion,
            etc.
          </li>
          <li>
            Avoid posting questions that include sexually explicit comments, hate speech,
            prejudicial remarks, and profanity.
          </li>
          <li>
            Do not mock other members, their comments, profiles, threads, or experiences.
            Remember, what is funny for you may be offensive to others.
          </li>
        </ul>
      </p>
    </Styled.AboutBody>
    <Styled.AboutFooter>
      <p>
        <strong>We need your help!</strong> Wizeline Questions is an internal project and
        everyone can contribute. Come aboard and meet the team. You can take a
        look at our source code for
        <a href="https://github.com/wizeline/wize-q-front"> Frontend</a> and
        <a href="https://github.com/wizeline/wize-q-back"> Backend</a> on GitHub.
      </p>
    </Styled.AboutFooter>
  </Styled.About>
);

export default About;