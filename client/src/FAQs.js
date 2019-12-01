import React from 'react';
import styled from 'styled-components';
import { Card, CardHeader, CardContent } from './Card';
import { useLocation } from 'react-router-dom';
import { HashLink as Link } from './HashLink';
import { Sentence, Word, getRuleTitle } from './TextMarkup';

const StyledFAQs = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const FAQ = styled(Card)`
  margin: 16px;
  width: 640px;
`;

const Question = styled(CardHeader)`
  font-size: 1.1rem;
`;

const Answer = styled(CardContent)`
  padding: 16px;
  line-height: 1.7em;
  hyphens: auto;
  text-align: justify;
`;

const Formula = styled.code`
  font-family: monospace;
`;

const Subsection = styled.div`
  font-weight: bold;
  margin-top: 8px;
`;

const Table = styled.div`
  width: 100%;
`;

const TCell = styled.div`
  padding: 4px;
  text-align: center;
  flex: 1;
`;

const TRow = styled.div`
  display: flex;
  & > &{TCell} {
    flex: 1
  }
  border-radius: 8px;
`;

const THead = styled.div`
  display: flex;
  border-radius: 8px;
  background-color: ${props => props.theme.primary.light};
  & > ${TCell} {
    font-weight: bold;
  }
`;

const TBody = styled.div`
  ${TRow}:nth-child(2n) {
    background-color: whitesmoke;
  }
`;

const database = [
  {
    id: 'colors',
    question: 'Was bedeuten die Farben?',
    answer: () => (
      <Answer>
        <Table>
          <THead>
            <TCell>Bedeutung</TCell>
            <TCell>Farbe</TCell>
          </THead>
          <TBody>
            <TRow>
              <TCell>Langes Word</TCell>
              <TCell>
                <Word rule="LONG_WORD">{getRuleTitle('LONG_WORD')}</Word>
              </TCell>
            </TRow>
            <TRow>
              <TCell>Füllwort</TCell>
              <TCell>
                <Word rule="FILLER">{getRuleTitle('FILLER')}</Word>
              </TCell>
            </TRow>
            <TRow>
              <TCell>Passivkonstruktion</TCell>
              <TCell>
                <Word rule="PASSIVE">{getRuleTitle('PASSIVE')}</Word>
              </TCell>
            </TRow>
            <TRow>
              <TCell>Langer Satz</TCell>
              <TCell>
                <Sentence rule="LONG_SENTENCE">
                  {getRuleTitle('LONG_SENTENCE')}
                </Sentence>
              </TCell>
            </TRow>
          </TBody>
        </Table>{' '}
      </Answer>
    )
  },
  {
    id: 'syllables',
    question: 'Wie werden die Silben bestimmt?',
    answer: () => (
      <Answer>
        Jedes Wort wird mithilfe eines{' '}
        <Link to="https://raw.githubusercontent.com/mikebarkmin/lesbar.club/master/server/dics/hyph_de_DE.dic">
          Wörterbuchs
        </Link>{' '}
        analysiert. Diese Wörterbuch basiert auf einem gängigen Wörterbuch,
        welches auch für die Silbentrennung in anderer Software wie LaTex und
        LibreOffice verwendet wird.
      </Answer>
    )
  },
  {
    id: 'readability_index',
    question: 'Was ist ein Lesbarkeitsindex?',
    answer: () => (
      <Answer>
        Ein Lesbarkeitsindex ist eine Formel oder ein Verfahren, mit dem
        versucht wird, die Lesbarkeit eines Textes zu berechnen. Er erfüllt die
        Funktion einer mathematischen Metrik. Dabei werden meistens nur
        syntaktische Eigenschaften berücksichtigt und keine semantischen.
      </Answer>
    )
  },
  {
    id: 'fre_de',
    question: 'Was ist der FRE_DE?',
    answer: () => (
      <Answer>
        Der Flesch-Reading-Ease für die deutsche Sprache ist ein{' '}
        <Link to="#readability_index">Lesbarkeitsindex</Link>.
        <Subsection>Berechnung</Subsection>
        <div>als = "Durchschnittliche Satzlänge"</div>
        <div>asw = "Durchschnittliche Silben pro Word"</div>
        <Formula>180 - als - (58.5 * asw)</Formula>
        <Table>
          <THead>
            <TCell>Wert</TCell>
            <TCell>Intepretation</TCell>
          </THead>
          <TBody>
            <TRow>
              <TCell>0</TCell>
              <TCell>sehr schwer</TCell>
            </TRow>
            <TRow>
              <TCell>30 - 50</TCell>
              <TCell>schwer</TCell>
            </TRow>
            <TRow>
              <TCell>50 - 60</TCell>
              <TCell>mittelschwer</TCell>
            </TRow>
            <TRow>
              <TCell>60 - 70</TCell>
              <TCell>mittel</TCell>
            </TRow>
            <TRow>
              <TCell>60 - 70</TCell>
              <TCell>mittel</TCell>
            </TRow>
            <TRow>
              <TCell>70 - 80</TCell>
              <TCell>mittelleicht</TCell>
            </TRow>
            <TRow>
              <TCell>80 - 90</TCell>
              <TCell>leicht</TCell>
            </TRow>
            <TRow>
              <TCell>90 - 100</TCell>
              <TCell>sehr leicht</TCell>
            </TRow>
          </TBody>
        </Table>
        <Subsection>Referenz</Subsection>
        Toni Amstad: Wie verständlich sind unsere Zeitungen? Universität Zürich:
        Dissertation 1978.
      </Answer>
    )
  },
  {
    id: 'gsmog',
    question: 'Was ist der GSMOG?',
    answer: () => (
      <Answer>
        Der G-Smog ist ein <Link to="#readability_index">Lesbarkeitsindex</Link>
        .<Subsection>Berechnung</Subsection>
        <div>w3 = "Wörter mit drei oder mehr Silben"</div>
        <div>s = "Zahl der Sätze"</div>
        <Formula>Wurzel((w3 * 30) / s) - 2</Formula>
        <Subsection>Interpretation</Subsection>
        Ergebnis ergibt näherungsweise die Eignung für eine Schulstufe.
        <Subsection>Referenz</Subsection>
        Bamberger, Richard/Vanecek, Erich: Lesen-Verstehen-Lernen-Schreiben. Die
        Schwierigkeitsstufen von Texten in deutscher Sprache. Wien: Jugend und
        Volk 1984.
      </Answer>
    )
  },
  {
    id: 'lix',
    question: 'Was ist der LIX?',
    answer: () => (
      <Answer>
        Der LIX ist ein <Link to="#readability_index">Lesbarkeitsindex</Link>.
        <Subsection>Berechnung</Subsection>
        <div>w = "Anzahl der Wörter"</div>
        <div>s = "Anzahl der Sätze"</div>
        <div>w6 = "Anzahl der Wörter mit mehr als 6 Buchstaben"</div>
        <Formula>w / s + 100 * w6 / w</Formula>
        <Table>
          <THead>
            <TCell>Wert</TCell>
            <TCell>Intepretation</TCell>
          </THead>
          <TBody>
            <TRow>
              <TCell>65</TCell>
              <TCell>sehr schwer</TCell>
            </TRow>
            <TRow>
              <TCell>55</TCell>
              <TCell>schwer</TCell>
            </TRow>
            <TRow>
              <TCell>45</TCell>
              <TCell>mittelschwer</TCell>
            </TRow>
            <TRow>
              <TCell>35</TCell>
              <TCell>leicht</TCell>
            </TRow>
            <TRow>
              <TCell>25</TCell>
              <TCell>sehr leicht</TCell>
            </TRow>
          </TBody>
        </Table>
        <Subsection>Referenz</Subsection>
        C.H. Björnsson: Läsbarhet. Stockholm: Liber 1968
      </Answer>
    )
  },
  {
    id: 'wstf_1',
    question: 'Was ist die WSTF_1?',
    answer: () => <Answer>Das ist eine Anwr</Answer>
  },
  {
    id: 'wstf_2',
    question: 'Was ist die WSTF_2?',
    answer: () => <Answer>Das ist eine Anwr</Answer>
  },
  {
    id: 'wstf_3',
    question: 'Was ist die WSTF_3?',
    answer: () => <Answer>Das ist eine Anwr</Answer>
  },
  {
    id: 'wstf_4',
    question: 'Was ist die WSTF_4?',
    answer: () => <Answer>Das ist eine Anwr</Answer>
  }
];

function FAQs() {
  const { hash } = useLocation();
  return (
    <StyledFAQs>
      {database.map(entry => (
        <FAQ key={entry.id} id={entry.id}>
          <Question secondary={hash.slice(1) === entry.id}>
            {entry.question}
          </Question>
          <entry.answer />
        </FAQ>
      ))}
    </StyledFAQs>
  );
}

export default FAQs;
