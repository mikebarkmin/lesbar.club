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
    id: 'colors',
    question: 'Was bedeuten die Hervorhebungen?',
    answer: () => (
      <Answer>
        <Table>
          <THead>
            <TCell>Bedeutung</TCell>
            <TCell>Hervorhebungen</TCell>
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
              <TCell>Abkürzung</TCell>
              <TCell>
                <Sentence rule="ABBREVIATION">
                  {getRuleTitle('ABBREVIATION')}
                </Sentence>
              </TCell>
            </TRow>
          </TBody>
        </Table>{' '}
      </Answer>
    )
  },
  {
    id: 'characters',
    question: 'Wie werden die Zeichen bestimmt?',
    answer: () => (
      <Answer>Es werden alle Zeichen inklusive Leerzeichen gezählt.</Answer>
    )
  },
  {
    id: 'letters',
    question: 'Wie werden die Buchstaben bestimmt?',
    answer: () => (
      <Answer>
        Von jedem <Link to="faq#words">Wort</Link> wird die Anzahl der Zeichen
        gezählt. Diese werden dann addiert und ergeben die Anzahl der
        Buchstaben. Sonderzeichen und Leerzeichen werden dabei nicht beachtet.
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
        analysiert. Dieses Wörterbuch basiert auf einem gängigen Wörterbuch,
        welches auch für die Silbentrennung in anderer Software wie LaTex und
        LibreOffice verwendet wird. Die tatsächliche Trennung wird durch das
        Python <a href="https://pyphen.org/">pyphen</a> Paket realisiert.
      </Answer>
    )
  },
  {
    id: 'sentences',
    question: 'Wie werden die Sätze bestimmt?',
    answer: () => (
      <Answer>
        Zur Bestimmung der Sätze wird ein unüberwachter Algorithmus verwendet,
        um ein Modell für Abkürzungen, Kollokationen und Wörter am Satzanfang zu
        bilden. Dieser Algorithmus wurde durch eine große Sammlung von Sätzen
        trainiert. Das trainierte Modell kann hier heruntergeladen werden:{' '}
        <a href="https://raw.githubusercontent.com/nltk/nltk_data/gh-pages/packages/tokenizers/punkt.zip">
          Punkt Tokenizer Models
        </a>
        .
      </Answer>
    )
  },
  {
    id: 'words',
    question: 'Wie werden die Wörter bestimmt?',
    answer: () => (
      <Answer>
        Zur Bestimmung der Wörter werden reguläre Ausdrücke verwendet. Für mehr
        Informationen siehe{' '}
        <a href="https://www.nltk.org/api/nltk.tokenize.html?highlight=treebankword#nltk.tokenize.treebank.TreebankWordTokenizer">
          TreebankWordTokenizer
        </a>
        .
      </Answer>
    )
  },
  {
    id: 'wordtag',
    question: 'Wie werden die Wortarten bestimmt?',
    answer: () => (
      <Answer>
        Die Wortarten werden mithilfe eines trainierten Modells bestimmt. Das
        Modell wurde mit den Daten{' '}
        <a href="http://hdl.handle.net/11022/0000-0000-7FC7-2">
          The Hamburg Dependency Treebank
        </a>{' '}
        trainiert. Diese sind unter der Lizenz{' '}
        <a href="https://creativecommons.org/licenses/by-sa/4.0/">
          CC-by-sa-4.0
        </a>{' '}
        frei verfügbar. Es wurden über 190.000 von Hand gecodetet Sätze zum
        Trainieren verwendet. Über 10.000 weitere Sätze wurden verwendet, um das
        Modell zu evaluieren. Ingesamt hat das Modell eine Genauigkeit von 94.5%
        erreicht. Das Modell kann hier heruntergeladen werden:{' '}
        <a href="https://github.com/mikebarkmin/lesbar.club/raw/master/server/lesbar/rules/de_DE/nltk_german_pos.pickle">
          NLTK German POS
        </a>
        .
      </Answer>
    )
  },
  {
    id: 'language',
    question: 'Wie wird die Sprache bestimmt?',
    answer: () => (
      <Answer>
        Zur Bestimmung der Sprache wird das Paket{' '}
        <a href="https://github.com/Mimino666/langdetect">langdetect</a>{' '}
        verwendet. Der Algorithmus erkannt anhand von Sprachprofilen, die aus
        Wikipedia-Artikeln gewonnen wurden, die jeweilige Sprache. Er hat eine
        Genauigkeit von 99%.
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
        <Formula>FRE_DE = 180 - als - (58.5 * asw)</Formula>
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
        <Formula>GSMOG = √((w3 * 30) / s) - 2</Formula>
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
        <Formula>LIX = w / s + 100 * w6 / w</Formula>
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
    answer: () => (
      <Answer>
        Die 1. Wienersachtext-Formel ist ein{' '}
        <Link to="#readability_index">Lesbarkeitsindex</Link>.
        <Subsection>Berechnung</Subsection>
        <div>sl = "Durchschnittliche Satzlänge"</div>
        <div>ms = "Anteil der Wörter mit drei oder mehr Silben"</div>
        <div>iw = "Anteil der Wörter mit sechs oder mehr Buchstaben"</div>
        <div>es = "Anteil der Wörter mit einer Silbe"</div>
        <Formula>
          WSTF_1 = 0.1935 * ms + 0.1672 * sl + 0.1297 * iw - 0.0327 * es - 0.875
        </Formula>
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
    id: 'wstf_2',
    question: 'Was ist die WSTF_2?',
    answer: () => (
      <Answer>
        Die 2. Wienersachtext-Formel ist ein{' '}
        <Link to="#readability_index">Lesbarkeitsindex</Link>.
        <Subsection>Berechnung</Subsection>
        <div>sl = "Durchschnittliche Satzlänge"</div>
        <div>ms = "Anteil der Wörter mit drei oder mehr Silben"</div>
        <div>iw = "Anteil der Wörter mit sechs oder mehr Buchstaben"</div>
        <Formula>
          WSTF_2 = 0.2007 * ms + 0.1682 * sl + 0.1373 * iw - 2.779
        </Formula>
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
    id: 'wstf_3',
    question: 'Was ist die WSTF_3?',
    answer: () => (
      <Answer>
        Die 3. Wienersachtext-Formel ist ein{' '}
        <Link to="#readability_index">Lesbarkeitsindex</Link>.
        <Subsection>Berechnung</Subsection>
        <div>sl = "Durchschnittliche Satzlänge"</div>
        <div>ms = "Anteil der Wörter mit drei oder mehr Silben"</div>
        <Formula>WSTF_3 = 0.2963 * ms + 0.1905 * sl - 1.1144</Formula>
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
    id: 'wstf_4',
    question: 'Was ist die WSTF_4?',
    answer: () => (
      <Answer>
        Die 4. Wienersachtext-Formel ist ein{' '}
        <Link to="#readability_index">Lesbarkeitsindex</Link>.
        <Subsection>Berechnung</Subsection>
        <div>sl = "Durchschnittliche Satzlänge"</div>
        <div>ms = "Anteil der Wörter mit drei oder mehr Silben"</div>
        <Formula>WSTF_4 = 0.2744 * ms + 0.2656 * sl - 1.693</Formula>
        <Subsection>Interpretation</Subsection>
        Ergebnis ergibt näherungsweise die Eignung für eine Schulstufe.
        <Subsection>Referenz</Subsection>
        Bamberger, Richard/Vanecek, Erich: Lesen-Verstehen-Lernen-Schreiben. Die
        Schwierigkeitsstufen von Texten in deutscher Sprache. Wien: Jugend und
        Volk 1984.
      </Answer>
    )
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
