import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Text = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Lesbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const ResultContainer = styled.div`
  margin: 8px;
  width: 120px;
`;
const ResultLabel = styled.div`
  font-size: 1.05rem;
  margin-bottom: 2px;
  text-transform: uppercase;
  text-overflow: ellipsis;
  text-align: center;
  color: ${props => props.theme.secondary.dark};
`;
const ResultValue = styled.div`
  text-align: center;
  font-size: 1.1rem;
  font-weight: bold;
  color: ${props => props.theme.text.dark};
`;

const Spacer = styled.div`
  background: ${props => props.theme.secondary.dark};
  height: 2px;
  width: 100%;
  margin: 16px;
`;

function Result({ value, label }) {
  return (
    <ResultContainer>
      <ResultLabel>{label}</ResultLabel>
      <ResultValue>{value}</ResultValue>
    </ResultContainer>
  );
}

function numberFormat(number) {
  return Math.round(number * 100) / 100;
}

function TextResult({ lesbar, text }) {
  return (
    <Container>
      <Text>
        <Result label="Zeichen" value={text.num_character} />
        <Result label="Buchstaben" value={text.num_letters} />
        <Result label="Silben" value={text.num_syllables} />
        <Result label="Sätze" value={text.num_sentences} />
        <Result label="Wörter" value={text.num_words} />
        <Result label="Sprache" value={text.detected_lang} />
      </Text>
      <Spacer />
      <Lesbar>
        {Object.keys(lesbar).map(key => (
          <Result key={key} label={key} value={numberFormat(lesbar[key])} />
        ))}
      </Lesbar>
    </Container>
  );
}

TextResult.propTypes = {
  lesbar: PropTypes.object,
  text: PropTypes.shape({
    num_words: PropTypes.number,
    num_sentences: PropTypes.number,
    num_syllables: PropTypes.number,
    num_letters: PropTypes.number,
    num_character: PropTypes.number,
    language: PropTypes.string,
    detected_lang: PropTypes.string,
    language_match: PropTypes.bool
  })
};

TextResult.defaultProps = {
  lesbar: {},
  text: {}
};

export default TextResult;
