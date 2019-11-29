import React, { useState, useEffect } from 'react';
import { Card, CardFooter, CardHeader, CardContent } from './Card';
import LanguageSelect from './LanguageSelect';
import { ButtonSecondary } from './Button';
import TextArea from './TextArea';
import TextResult from './TextResult';
import TextNotify from './TextNotify';
import TextMarkup from './TextMarkup';
import config from './config';

function TextCard() {
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState();
  const [text, setText] = useState(
    'Ein Lesbarkeitsindex ist eine Formel oder ein Verfahren, mit dem versucht wird, die Lesbarkeit eines Textes formal durch mathematische Formeln zu berechnen. Er erfüllt die Funktion einer mathematischen Metrik. Drücke Überprüfen, um den Text zu analysieren.'
  );
  const [results, setResults] = useState(null);
  const [altResults, setAltResults] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showLimit, setShowLimit] = useState(false);

  useEffect(() => {
    fetch(config.apiURL + '/api/v1/languages', {
      method: 'GET'
    })
      .then(r => r.json())
      .then(json => {
        setLanguages(json.languages);
        setLanguage(json.languages[0]);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  function testText() {
    setShowLimit(false);
    fetch(config.apiURL + '/api/v1/lesbar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text, language })
    })
      .then(response => response.json())
      .then(json => {
        setResults(json['results']);
        setShowResult(true);
        if ('alt_results' in json) {
          setAltResults(json['alt_results']);
        }
      })
      .catch(e => {});
  }

  function handleLanguageChange(value) {
    setLanguage(value);
  }

  function handleShowTextArea() {
    setShowResult(false);
  }

  function handleTextChange(e) {
    if (e.target.value.length <= 20000) {
      setShowLimit(false);
    } else {
      setShowLimit(true);
    }
    setText(e.target.value.substr(0, 20000));
    setShowResult(false);
  }

  function handleUseAlt() {
    setLanguage(altResults.text.language);
    setResults(altResults);
    setAltResults(null);
  }

  function handleShowResult() {
    setShowResult(true);
  }

  return (
    <Card>
      <CardHeader>
        <h2>Text</h2>
        <LanguageSelect
          languages={languages}
          value={language}
          onChange={handleLanguageChange}
        />
        <ButtonSecondary onClick={testText} style={{ marginLeft: 8 }}>
          Überprüfen
        </ButtonSecondary>
      </CardHeader>
      <CardContent>
        {!showResult ? (
          <TextArea
            onChange={handleTextChange}
            value={text}
            placeholder="Gib den zu prüfenden Text hier ein..."
          ></TextArea>
        ) : (
          <TextMarkup
            onClick={handleShowTextArea}
            sentences={results.text.sentences}
          ></TextMarkup>
        )}
      </CardContent>
      <CardFooter>
        {showLimit && (
          <div style={{ padding: 16, textAlign: 'center' }}>
            Es dürfen nur 20.000 Zeichen verwendet werden. Der Rest wurde
            abgeschnitten.
          </div>
        )}
        {showResult && altResults && <TextNotify onClick={handleUseAlt} />}
        {showResult && results && <TextResult {...results} />}
        {!showResult && results && (
          <div style={{ padding: 16, textAlign: 'center' }}>
            <ButtonSecondary onClick={handleShowResult}>
              Zeige letzte Analyse
            </ButtonSecondary>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

export default TextCard;
