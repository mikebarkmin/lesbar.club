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
  border-left: 6px solid ${props => props.difficulty};
  padding: 8px;
`;

const Word = styled.span`
  color: ${props => (props.difficult ? '#0b9fd8' : props.theme.text.dark)};
  font-weight: ${props => (props.difficult ? 'bold' : null)};
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

function sentenceDifficulty(words) {
  let difficultWords = 0;
  words.forEach(w => {
    if (wordIsDifficult(w.syllables)) {
      difficultWords++;
    }
  });

  if (difficultWords >= 5) {
    return 'red';
  } else if (difficultWords >= 2) {
    return 'orange';
  } else {
    return 'green';
  }
}

function wordIsDifficult(syllables) {
  return syllables.length >= 3;
}

function TextMarkup({ onClick, sentences }) {
  return (
    <TextMarkupContainer onClick={onClick}>
      {sentences.map(({ words }, i) => {
        const difficulty = sentenceDifficulty(words);
        let title = '';
        if (difficulty === 'red') {
          title = 'Schwieriger Satz. 5 oder mehr schwierige Wörter.';
        } else if (difficulty === 'orange') {
          title = 'Mittlerer Satz. 2 oder mehr schwierige Wörter.';
        } else {
          title = 'Einfacher Satz.';
        }
        return (
          <Sentence key={i} title={title} difficulty={difficulty}>
            {words.map(({ syllables }, k) => (
              <Word
                key={i + ',' + k}
                title={
                  wordIsDifficult(syllables)
                    ? 'Schwieriges Wort. 3 oder mehr Silben.'
                    : null
                }
                difficult={wordIsDifficult(syllables)}
              >
                {syllables.map(({ content }, p) => (
                  <Syllable key={i + ',' + k + ',' + p}>{content}</Syllable>
                ))}
              </Word>
            ))}
          </Sentence>
        );
      })}
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
