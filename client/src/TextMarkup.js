import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TextMarkupContainer = styled.div`
  padding: 16px;
  height: 400px;
  overflow-y: auto;
`;

export const Sentence = styled.div`
  background: #fff1e6;
  border-radius: 8px;
  margin-bottom: 16px;
  border-left: ${props =>
    props.rule === 'LONG_SENTENCE' ? '6px solid red' : null};
  padding: 8px;
  &:last-child {
    margin: 0;
  }
`;

export const Word = styled.span`
  position: relative;
  padding-top: 12px;
  min-width: 35px;
  text-align: center;
  color: ${props => {
    switch (props.rule) {
      case 'LONG_WORD':
        return '#0b9fd8';
      case 'FILLER':
        return '#9932CC';
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

const WordTag = styled.span`
  font-weight: normal;
  color: grey;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  text-align: center;
  font-size: 0.6rem;
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

export function getRuleTitle(rule) {
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

function getTagTitle(tag) {
  switch (tag) {
    case 'ADJA':
      return 'Attributives Adjektiv';
    case 'ADJD':
      return 'Adverbiales oder prädikatives Adjektiv';
    case 'ADV':
      return 'Adverb';
    case 'APPR':
      return 'Präposition; Zirkumposition links';
    case 'APPRART':
      return 'Präposition mit Artikel';
    case 'APPO':
      return 'Postposition';
    case 'APZR':
      return 'Zirkumposition rechts';
    case 'ART':
      return 'Bestimmer oder unbestimmer Artikel';
    case 'CARD':
      return 'Kardinalzahl';
    case 'FM':
      return 'Fremdsprachichles Material';
    case 'ITJ':
      return 'Interjektion';
    case 'KOUI':
      return 'unterordnende Konjunktion mit zu und Infinitiv';
    case 'KOUS':
      return 'unterordnende Konjunktion mit Satz';
    case 'KON':
      return 'nebenordnende Konjunktion';
    case 'KOKOM':
      return 'Vergleichskonjunktion';
    case 'NN':
      return 'normales Nomen';
    case 'NE':
      return 'Eigennamen';
    case 'PDS':
      return 'substituierendes Demonstrativpronomen';
    case 'PDAT':
      return 'attribuierendes Demonstrativpronomen';
    case 'PIS':
      return 'substituierendes Indefinitpronomen';
    case 'PIAT':
      return 'attribuierendes Indefinitpronomen ohne Determiner';
    case 'PIDAT':
      return 'attribuierendes Indefinitpronomen mit Determiner';
    case 'PPER':
      return 'irreflexives Personalpronomen';
    case 'PPOSS':
      return 'substituierendes Possessivpronomen';
    case 'PPOSAT':
      return 'attribuierendes Possessivpronomen';
    case 'PRELS':
      return 'substituierendes Relativpronomen';
    case 'PRELAT':
      return 'attribuierendes Relativpronomen';
    case 'PRF':
      return 'reflexives Personalpronomen';
    case 'PWS':
      return 'substituierendes Interrogativpronomen';
    case 'PWAT':
      return 'attribuierendes Interrogativpronomen';
    case 'PWAV':
      return 'adverbiales Interrogativ- oder Relativpronomen';
    case 'PAV':
      return 'Pronominaladverb';
    case 'PTKZU':
      return 'zu vor Infinitiv';
    case 'PTKNEG':
      return 'Negationspartike';
    case 'PTKVZ':
      return 'abgetrennter Verbzusatz';
    case 'PTKANT':
      return 'Antwortpartikel';
    case 'PTKA':
      return 'Partikel bei Adjektiv oder Adverb';
    case 'TRUNC':
      return 'Kompositions-Erstglied';
    case 'VVFIN':
      return 'finites Verb, voll';
    case 'VVIMP':
      return 'Imperativ, voll';
    case 'VVINF':
      return 'Infinitiv';
    case 'VVIZU':
      return 'Infinitiv mit zu';
    case 'VVPP':
      return 'Partizip Perfekt';
    case 'VAFIN':
      return 'finites Verb, aux';
    case 'VAIMP':
      return 'Imperativ, aux';
    case 'VAINF':
      return 'Infinitiv, aux';
    case 'VAPP':
      return 'Partizip Perfekt';
    case 'VMFIN':
      return 'finites Verb, modal';
    case 'VMINF':
      return 'Infinitiv, modal';
    case 'VMPP':
      return 'Partizip Perfekt, modal';
    case 'XY':
      return 'Nichtwort, Sonderzeichen';
    default:
      return 'Nicht definiert, zb. Satzzeichen';
  }
}

function TextMarkup({ onClick, sentences }) {
  return (
    <TextMarkupContainer onClick={onClick}>
      {sentences.map(({ words, rule }, i) => (
        <Sentence title={getRuleTitle(rule)} key={i} rule={rule}>
          {words.map(({ syllables, rule, tag }, k) => (
            <Word title={getRuleTitle(rule)} key={i + ',' + k} rule={rule}>
              <WordTag title={`${getTagTitle(tag)} (94.5% Treffsicherheit)`}>
                {tag}
              </WordTag>
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
