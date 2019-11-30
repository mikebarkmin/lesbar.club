import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TextMarkupContainer = styled.div`
  padding: 16px;
  height: 400px;
  overflow-y: auto;
`;

const Sentence = styled.div`
  background: #fff1e6;
  border-radius: 8px;
  margin-bottom: 16px;
  border-left: ${props =>
    props.rule === 'LONG_SENTENCE' ? '6px solid red' : null};
  padding: 8px;
`;

const Word = styled.span`
  color: ${props => {
    switch (props.rule) {
      case 'LONG_WORD':
        return '#0b9fd8';
      case 'FILLER':
        return '#FF6347';
      case 'PASSIVE':
        return '#FF7F50';
      default:
        return props.theme.text.dark;
    }
  }};
  font-weight: ${props => (props.rule !== 'NORMAL' ? 'bold' : null)};
  &:after {
    content: ' ';
  }

  &:last-child:after {
    content: '';
  }
`;

const Syllable = styled.span`
  font-size: 1.2rem;
  line-height: 1.7em;

  &:after {
    content: '-';
  }

  &:last-child:after {
    content: '';
  }
`;

function getTile(rule) {
  switch (rule) {
    case 'LONG_WORD':
      return 'Langes Wort. Drei oder mehr Silben.';
    case 'LONG_SENTENCE':
      return 'Langer Satz. Neun oder mehr Wörter';
    case 'FILLER':
      return 'Füllwort. Kann vielleicht vermieden werden.';
    case 'PASSIVE':
      return 'Passiv. Sollte vermieden werden.';
    default:
      return null;
  }
}

function TextMarkup({ onClick, sentences }) {
  return (
    <TextMarkupContainer onClick={onClick}>
      {sentences.map(({ words, rule }, i) => (
        <Sentence title={getTile(rule)} key={i} rule={rule}>
          {words.map(({ syllables, rule }, k) => (
            <Word title={getTile(rule)} key={i + ',' + k} rule={rule}>
              {syllables.map(({ content }, p) => (
                <Syllable key={i + ',' + k + ',' + p}>{content}</Syllable>
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
