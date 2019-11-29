import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TextMarkupContainer = styled.div`
  padding: 16px;
`;

const Sentence = styled.div`
  background: #fff1e6;
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 8px;
`;

const Word = styled.span`
  &:after {
    content: ' ';
  }

  &:last-child:after {
    content: '';
  }
`;

const Syllable = styled.span`
  font-size: 1.2rem;
  font-family: serif;

  &:after {
    content: '-';
  }

  &:last-child:after {
    content: '';
  }
`;

function TextMarkup({ onClick, sentences }) {
  console.log(sentences);
  return (
    <TextMarkupContainer onClick={onClick}>
      {sentences.map(({ words }) => (
        <Sentence>
          {words.map(({ syllables }) => (
            <Word>
              {syllables.map(({ content }) => (
                <Syllable>{content}</Syllable>
              ))}
            </Word>
          ))}
        </Sentence>
      ))}
    </TextMarkupContainer>
  );
}

TextMarkup.propTypes = {
  onClick: PropTypes.func,
  sentences: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
      end: PropTypes.number,
      start: PropTypes.number,
      words: PropTypes.arrayOf(
        PropTypes.shape({
          content: PropTypes.string,
          end: PropTypes.number,
          start: PropTypes.number,
          syllables: PropTypes.arrayOf(
            PropTypes.shape({
              content: PropTypes.string
            })
          )
        })
      )
    })
  )
};

export default TextMarkup;
