import React from 'react';
import { json } from '@remix-run/node';
import * as Styled from 'app/styles/About.Styled';
import { requireAuth } from 'app/session.server';

export const loader = async ({ request }) => {
  await requireAuth(request);
  return json({});
};

function About() {
  return (
    <Styled.About>
      <Styled.AboutBody>
        <h1>About Us</h1>
        <h2>This is Wizeline Questions</h2>
        <p>
          <strong>Wizeline Questions (WizeQ)</strong>
          {' '}
          is an open forum & platform for knowledge-sharing where
          you can express your ideas and learn more about Wizeline.
          We value your contributions and are looking forward to
          learning from your questions, ideas and suggestions.
        </p>
        <p> Here are some examples of what you can do in the tool: </p>
        <span>
          <Styled.ListContainer>
            <ul>
              <li>
                If you have a question, you can check if someone else has asked it before.
              </li>
              <li>
                {' '}
                If the question wasn’t asked before, it’s your time to shine!
                Post it and it will be answered shortly.
                You can tag your question per location and topic,
                this will make it easier for the corresponding area to respond!
              </li>
              <li>
                Want to get other Wizeliners’ opinions on a specific topic or
                do you have an idea that you want to share?
                Start a conversation or participate in any of the previous questions or comments.
              </li>
              <li>
                Do you want to ask a sensitive question? Post your question anonymously,
                it will be posted privately and will only be visible to the leader of the
                area that the question is being directed to, and the platform’s moderators,
                who will be able to respond directly
              </li>
            </ul>
          </Styled.ListContainer>
        </span>

        <h3>Things to Keep in Mind When Asking a Question</h3>
        <p>
          We value your ideas, questions, suggestions, and comments. Therefore, we
          encourage you to use this communication space. Please, when writing a new
          question or a comment follow these recommendations:
        </p>
        <Styled.ListContainer>
          <ul>
            <li>
              <strong>Strive for constructive open communication.</strong>
              <ul>
                <li>
                  {' '}
                  Encourage open dialogue that is constructive
                  and beneficial to the entire community.

                </li>
                <li>
                  Express ideas and opinions respectfully,
                  fostering an environment conducive to professional growth
                </li>
              </ul>
            </li>
            <li>
              <strong>Avoid Vagueness.</strong>
              <ul>
                <li>
                  Clearly articulate questions and responses
                  to ensure clarity and effective communication
                </li>
                <li>
                  Provide adequate context to promote a better
                  understanding of the topics being discussed.
                </li>
              </ul>
            </li>
            <li>
              <strong>Respect and Inclusion</strong>
              <ul>
                <li>
                  Do not demean or degrade others based on gender,
                  race, age, religion, or any other personal attributes.
                </li>
                <li>
                  Foster an inclusive environment that welcomes
                  diverse perspectives and experiences.
                </li>
              </ul>
            </li>
            <li>
              {' '}
              <strong> Mindful Language Use:</strong>
              {' '}
            </li>
            <ul>
              <li>
                {' '}
                Avoid posting questions or comments that include sexually explicit
                content, hate speech, prejudicial remarks, or profanity.

              </li>
              <li> Choose language that promotes a positive and respectful atmosphere.</li>
            </ul>

            <li>
              <strong> Avoid Mockery and Offense:</strong>
              {' '}
            </li>
            <ul>
              <li> Refrain from mocking other members, their comments, or experiences.</li>
              <li>
                {' '}
                Be mindful that humor is subjective, and what may be funny
                to one person could be offensive to another.
                {' '}
              </li>
            </ul>
            <li>
              {' '}
              <strong> Confidentiality and Privacy:</strong>
              {' '}
            </li>
            <ul>
              <li>
                {' '}
                Do not post sensitive or confidential information about
                individuals, projects, or about Wizeline.

              </li>
              <li>
                {' '}
                Protect the privacy of fellow Wizeliners and uphold
                the trust within our community.
              </li>
            </ul>

          </ul>

        </Styled.ListContainer>
      </Styled.AboutBody>
      <Styled.AboutFooter>
        <p>
          <strong>We need your help!</strong>
          {' '}
          Wizeline Questions is an internal project and
          everyone can contribute. Come aboard and meet the team at
          <a href="https://wizeline.slack.com/archives/C031D9DP7C2" target="_blank" rel="noopener noreferrer">#wize-q-2022</a>
          . You can take a
          look at our
          <a href="https://github.com/wizeline/wize-q-remix"> source code</a>
          {' '}
          on GitHub.
        </p>
      </Styled.AboutFooter>
    </Styled.About>
  );
}

export default About;
